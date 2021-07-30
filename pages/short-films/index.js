import Layout from '@/components/layout';
import Link from 'next/link';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import ReactPlayer from 'react-player/youtube';

export default function ProfilesPage({ shortFilmPage }) {
  const { firstToWatch } = shortFilmPage;
  return (
    <Layout title="Phim ngắn Thái Lan">
      <h1 className="hidden">Phim ngắn Thái Lan</h1>
      <div className="grid lg:grid-cols-5 gap-16">
        <div className="lg:col-span-3 lg:h-128">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${firstToWatch.youtubeVideoId}`}
            width="100%"
            height="100%"
          />
        </div>
        <div className="lg:py-4 lg:col-span-2">
          <h2 className="font-bold text-2xl">{firstToWatch.title}</h2>
          <p>{firstToWatch.description}</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        shortFilmPage {
          firstToWatch {
            title
            description
            youtubeVideoId
            slug
          }
        }
      }
    `,
  });

  const { shortFilmPage } = data;

  return { props: { shortFilmPage } };
}
