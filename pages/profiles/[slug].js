import Layout from '@/components/layout';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import ReactPlayer from 'react-player/youtube';
import { getYoutubeThumbnail } from '@/libs/get-youtube-thumbnails';
import { getMusicVideoUrl, getVideoAddTranslationRoute } from '@/libs/get-urls';
import { getImageMetadata } from '@/libs/get-image-url';

export default function Profile_Detail__Page({ profile }) {
  return (
    <Layout
      title={profile.artName}
      useImageBanner={profile.backdrop}
      imageBanner={profile.backdrop}
    >
      <div className="flex max-w-4xl mx-auto mb-12 gap-24">
        <div className="w-48 h-48">
          {profile.avatar ? (
            <img
              className="rounded-full"
              src={getImageMetadata(profile.avatar, 'small').url}
              alt={`Avatar của ${profile.artName}`}
              width="100%"
              height="100%"
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="md:py-4">
          <h1 className="font-bold text-2xl">{profile.artName}</h1>
          <p>{profile.description && profile.description}</p>
        </div>
      </div>
      {profile.originalMusicVideos.length > 0 && (
        <>
          <p className="my-4">Music videos</p>
          <ul className="grid lg:grid-cols-4 gap-4">
            {profile.originalMusicVideos.map((mv) => (
              <li key={mv.englishTitle}>
                <Link href={getMusicVideoUrl(mv.slug)}>
                  <a>
                    <img
                      className="rounded-lg"
                      src={getYoutubeThumbnail(mv.youtubeVideoId, 'medium')}
                      alt={`${mv.englishTitle} Youtube thumbnail`}
                      width="100%"
                      height="100%"
                    />
                    <div>{mv.englishTitle}</div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  const res = await fetch(`${API_URL}/profiles/${slug}`);
  const data = await res.json();

  return { props: { profile: data } };
}
