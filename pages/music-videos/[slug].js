import Layout from '@/components/layout';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import ReactPlayer from 'react-player/youtube';
import { getYoutubeThumbnail } from '@/libs/get-youtube-thumbnails';
import { getProfileUrl, getVideoAddTranslationRoute } from '@/libs/get-urls';
import { getImageMetadata } from '@/libs/get-image-url';
import { RiInstagramLine } from 'react-icons/ri';

export default function MusicVideoDetailPage({ video }) {
  const { contentReactions } = video;

  return (
    <Layout
      title={`${video.englishTitle} ${
        video.thaiTitle === video.englishTitle ? video.thaiTitle : ''
      } lyrics, lời dịch`}
    >
      <h1 className="font-bold text-2xl my-4">
        {video.englishTitle} {video.thaiTitle}
        {video.transliteration ? ' ' + '(' + video.transliteration + ')' : ''}
      </h1>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 items-stretch gap-8 md:gap-8 lg:gap-16">
        <div className="lg:col-span-3 self-stretch">
          <div className="sticky top-1">
            <div className="relative bg-gray-100 dark:bg-gray-900 md:p-4 dark:p-0 lg:p-6 rounded-md h-56 md:h-48 lg:h-128">
              <ReactPlayer
                className="relative z-10 overflow-hidden rounded-md"
                width="100%"
                height="100%"
                playing
                url={`https://www.youtube.com/watch?v=${video.youtubeVideoId}`}
              />
              <img
                className="absolute top-0 left-0 w-full h-full z-0 filter blur-2xl dark:brightness-05"
                src={getYoutubeThumbnail(video.youtubeVideoId, 'medium')}
                alt="BG"
              />
            </div>
            <div className="my-4 grid grid-cols-5 gap-1 items-stretch">
              <button className="bg-gray-50 dark:bg-gray-800 rounded-md px-2 py-3">
                {video.reactions.numOfLike} Like
              </button>
              <button className="bg-gray-50 dark:bg-gray-800 rounded-md px-2 py-3">
                {video.reactions.numOfLove} Love
              </button>
              <button className="bg-gray-50 dark:bg-gray-800 rounded-md px-2 py-3">
                {video.reactions.numOfLaugh} Haha
              </button>
              <button className="bg-gray-50 dark:bg-gray-800 rounded-md px-2 py-3">
                {video.reactions.numOfTouched} Sad
              </button>
              <button className="bg-gray-50 dark:bg-gray-800 rounded-md px-2 py-3">
                {video.reactions.numOfAmused} Amused
              </button>
            </div>
            {/* <div className="my-4">
              <h2 className="text-2xl">{video.thaiTitle && video.thaiTitle}</h2>
              <p>{video.transliteration && video.transliteration}</p>
            </div> */}
            <div className="py-4">
              <p className="text-sm">Performed by:</p>
              <ul>
                {video.originallyPerformedBy.map((artist) => (
                  <li key={artist.artName}>
                    <Link href={getProfileUrl(artist.slug)}>
                      <a className="hover:bg-gray-500">{artist.artName}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {video.casts.length > 0 && (
              <div className="py-4">
                <p className="text-lg my-4">Casts:</p>
                <ul>
                  {video.casts.map((profile) => (
                    <li
                      key={profile.artName}
                      className="flex gap-4 items-center object-cover"
                    >
                      <Link href={getProfileUrl(profile.slug)}>
                        <a>
                          <img
                            className="w-16 h-16 rounded-sm"
                            src={
                              getImageMetadata(profile.avatar, 'thumbnail').url
                            }
                            width={
                              getImageMetadata(profile.avatar, 'thumbnail')
                                .width
                            }
                            height={
                              getImageMetadata(profile.avatar, 'thumbnail')
                                .height
                            }
                          />
                        </a>
                      </Link>
                      <div>
                        <Link href={getProfileUrl(profile.slug)}>
                          <a className="font-semibold text-lg hover:underline">
                            {profile.artName}
                          </a>
                        </Link>
                        {profile.instagram && (
                          <a
                            href={`https://www.instagram.com${profile.instagram}`}
                          >
                            <RiInstagramLine
                              className="hover:bg-gray-100"
                              size={16}
                            />
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-sm my-4">Lời dịch:</p>
            <div className="flex flex-col gap-4">
              <div className="md:col-span-2">
                {video.translations.length <= 0 && (
                  <div className="">Hiện chưa có bản dịch nào.</div>
                )}
                {video.translations.length > 0 && (
                  <div>
                    {video.translations.map((item) => (
                      <div
                        key={item.author}
                        className="rounded-md px-6 py-4 bg-gray-50 hover:bg-orange-200"
                      >
                        {item.author}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="rounded-md gap-4">
                {/* <p>Lorem ispum</p> */}
                <Link href={getVideoAddTranslationRoute(video.slug)}>
                  <a className="inline-block py-3 px-6 rounded-full h-12 bg-orange-400 hover:bg-orange-600 font-bold">
                    Thêm lời dịch
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <article className="lg:col-span-2 dark:text-gray-200">
          {video.lyrics.split('\n').map((paragraph) => {
            if (paragraph === '') {
              return <div className="my-5"></div>;
            } else {
              return <p className="lg:text-lg">{paragraph}</p>;
            }
          })}
        </article>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  const res = await fetch(`${API_URL}/music-videos/${slug}`);
  let data = await res.json();

  function calculateNumOfReactions(array) {
    let numOfLike = 0,
      numOfLove = 0,
      numOfLaugh = 0,
      numOfTouched = 0,
      numOfAmused = 0;
    for (let i = 0; i < array.length; i++) {
      switch (array[i].type) {
        case 'like':
          numOfLike += 1;
          break;
        case 'love':
          numOfLove += 1;
          break;
        case 'laugh':
          numOfLaugh += 1;
          break;
        case 'touched':
          numOfTouched += 1;
          break;
        case 'amused':
          numOfAmused += 1;
          break;
        default:
      }
    }

    return {
      numOfLike,
      numOfLove,
      numOfLaugh,
      numOfTouched,
      numOfAmused,
    };
  }

  let reactions = calculateNumOfReactions(data.contentReactions);
  data = {
    ...data,
    reactions,
  };

  return { props: { video: data } };
}
