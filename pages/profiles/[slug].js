import Layout from '@/components/layout';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import ReactPlayer from 'react-player/youtube';
import { getYoutubeThumbnail } from '@/libs/get-youtube-thumbnails';
import { getMusicVideoUrl, getVideoAddTranslationRoute } from '@/libs/get-urls';

export default function Profile_Detail__Page({ profile }) {
  return (
    <Layout title={profile.artName}>
      <h1>{profile.artName}</h1>

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
