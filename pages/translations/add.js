import Layout from '@/components/layout';
import Error from 'next/error';

import { API_URL } from '@/config/index';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import ReactPlayer from 'react-player/youtube';
import { getYoutubeThumbnail } from '@/libs/get-youtube-thumbnails';

export default function MusicVideoDetailPage({ errorCode, video }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <Layout
      title={`${video.englishTitle} ${
        video.thaiTitle === video.englishTitle ? video.thaiTitle : ''
      } lyrics, lời dịch`}
    >
      <h1 className="font-bold text-2xl my-4">{video.englishTitle}</h1>
      <div className="fixed z-50 bottom-0 left-0 w-full bg-gray-100 flex gap-12 bg-red-100 p-4">
        <div className="relative bg-gray-200 md:p-4 rounded-md h-56 md:h-48 lg:h-64">
          <ReactPlayer
            className="relative z-10 overflow-hidden rounded-md"
            width="450px"
            height="280px"
            playing
            url={`https://www.youtube.com/watch?v=${video.youtubeVideoId}`}
          />
          <img
            className="absolute top-0 left-0 w-full h-full z-0 filter blur-2xl"
            src={getYoutubeThumbnail(video.youtubeVideoId, 'medium')}
            alt="BG"
          />
        </div>
        <div className="py-4">
          <p className="text-sm">Performed by:</p>
          {video.originallyPerformedBy.map((artist) => (
            <div>{artist.artName}</div>
          ))}
        </div>
      </div>
      <p className="my-4">Editor</p>
      <div className="grid grid-cols-2 gap-12">
        <div className="lg:col-span-1 self-stretch">
          <textarea
            rows={100}
            className="border-2 border-gray-200 focus:border-gray-500 w-full h-full font-sans text-base lg:text-lg text-gray-900 px-4 py-4"
            type="text"
          />
        </div>
        <div className="lg:col-span-1 items-stretch gap-8 md:gap-8 lg:gap-16">
          <article className="text-gray-500 dark:text-gray-500">
            {video.lyrics.split('\n').map((paragraph) => {
              if (paragraph === '') {
                return <div className="my-5"></div>;
              } else {
                return <p className="lg:text-lg">{paragraph}</p>;
              }
            })}
          </article>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    query: { slug },
  } = context;

  if (!slug) {
    return {
      props: {
        errorCode: 400,
      },
    };
  }

  const res = await fetch(`${API_URL}/music-videos/${slug}`);
  var errorCode = res.ok ? false : res.status;

  if (!res.ok) {
    return {
      props: {
        errorCode,
      },
    };
  }

  const data = await res.json();
  return {
    props: { errorCode, video: data },
  };
}
