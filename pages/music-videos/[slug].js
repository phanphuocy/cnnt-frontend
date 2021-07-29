import Layout from '@/components/layout';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import ReactPlayer from 'react-player/youtube';
import { getYoutubeThumbnail } from '@/libs/get-youtube-thumbnails';
import { getProfileUrl, getVideoAddTranslationRoute } from '@/libs/get-urls';

export default function MusicVideoDetailPage({ video }) {
  return (
    <Layout
      title={`${video.englishTitle} ${
        video.thaiTitle === video.englishTitle ? video.thaiTitle : ''
      } lyrics, lời dịch`}
    >
      <h1 className="font-bold text-2xl my-4">{video.englishTitle}</h1>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 items-stretch gap-8 md:gap-8 lg:gap-16">
        <div className="lg:col-span-3 self-stretch">
          <div class="sticky top-10 dark:bg-gray-800">
            <div className="relative bg-gray-100 md:p-4 lg:p-6 rounded-md h-56 md:h-48 lg:h-128">
              <ReactPlayer
                className="relative z-10 overflow-hidden rounded-md"
                width="100%"
                height="100%"
                playing
                url={`https://www.youtube.com/watch?v=${video.youtubeVideoId}`}
              />
              <img
                className="absolute top-0 left-0 w-full h-full z-0 filter blur-2xl"
                src={getYoutubeThumbnail(video.youtubeVideoId, 'medium')}
                alt="BG"
              />
            </div>
            <div className="my-4">
              <h2 className="text-2xl">{video.thaiTitle && video.thaiTitle}</h2>
            </div>
            <div className="py-4">
              <p className="text-sm">Performed by:</p>
              <ul>
                {video.originallyPerformedBy.map((artist) => (
                  <li>
                    <Link href={getProfileUrl(artist.slug)}>
                      <a className="hover:bg-gray-500">{artist.artName}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm my-4">Lời dịch:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 md:col-span-2">
                {video.translations.length <= 0 && (
                  <div className="px-6 py-4">Hiện chưa có bản dịch nào.</div>
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
              <div className="bg-gray-50 rounded-md px-4 py-6 flex flex-col items-center gap-4">
                <p>Lorem ispum</p>
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
      <div className="mt-16 w-full bg-gray-200 h-4"></div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  const res = await fetch(`${API_URL}/music-videos?slug=${slug}`);
  const data = await res.json();

  return { props: { video: data[0] } };
}
