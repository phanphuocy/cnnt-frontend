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
    <Layout title={profile.artName}>
      <div className="flex max-w-3xl mx-auto gap-8">
        <div className="max-w-4 max-h-4">
          {profile.avatar ? (
            <img
              className="object-cover max-h-36 max-w-36"
              src={getImageMetadata(profile.avatar, 'small').url}
              alt={`Avatar của ${profile.artName}`}
              width="156px"
              height="156px"
            />
          ) : (
            <div></div>
          )}
        </div>
        <h1>{profile.artName}</h1>
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
