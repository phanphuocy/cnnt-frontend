import Layout from '@/components/layout';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import { API_URL } from '../config';
import qs from 'qs';

export default function SearchPage({ songs, term }) {
  return (
    <Layout title="Search">
      <h1>Showing results for "{term}"</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>{song.englishTitle}</li>
        ))}
      </ul>
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
      ],
    },
  });
  const res = await fetch(`${API_URL}/music-videos?${query}`);
  const data = await res.json();

  console.log(data);

  return {
    props: {
      term,
      songs: data,
    },
  };
}
