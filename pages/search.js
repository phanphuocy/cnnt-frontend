import Layout from '@/components/layout';
import Link from 'next/link';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import { API_URL } from '../config';
import qs from 'qs';
import { getMusicVideoUrl } from '@/libs/get-urls';
import { getYoutubeThumbnail } from '@/libs/get-youtube-thumbnails';

export default function SearchPage({ songs, term }) {
  return (
    <Layout title="Search">
      <h1>Showing results for "{term}"</h1>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-4">
            {songs.map((song) => (
              <li key={song.id}>
                <Link href={getMusicVideoUrl(song.slug)}>
                  <a className="flex gap-8">
                    <img
                      className="object-cover"
                      src={getYoutubeThumbnail(song.youtubeVideoId, 'medium')}
                      alt=""
                      width="240px"
                      height="180px"
                    />

                    <div>
                      <h3 className="text-xl font-bold">{song.englishTitle}</h3>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        {
          englishTitle_contains: term,
        },
        {
          thaiTitle_contains: term,
        },
        {
          lyrics_contains: term,
        },
      ],
    },
  });

  const mvRes = await fetch(`${API_URL}/music-videos?${query}`);
  const data = await mvRes.json();

  console.log(data);

  return {
    props: {
      term,
      songs: data,
    },
  };
}
