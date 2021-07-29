import Layout from '@/components/layout';
import Link from 'next/link';
import client from '@/config/apollo-client';
import { getProfileUrl } from '@/libs/get-urls';
import { gql } from '@apollo/client';

export default function ProfilesPage({ profiles }) {
  return (
    <Layout title="Profiles">
      <h1>Profiles</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {profiles.map((item) => (
          <li className="bg-gray-100 px-3 py-4 rounded-md" key={item.id}>
            <Link href={getProfileUrl(item.slug)}>
              <a>
                <div className="block h-16 w-16 bg-gray-600">Avarat</div>
                <p>{item.artName}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        profiles {
          artName
          slug
        }
      }
    `,
  });

  const { profiles } = data;

  return { props: { profiles } };
}
