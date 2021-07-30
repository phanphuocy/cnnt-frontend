import Layout from '@/components/layout';
import Link from 'next/link';
import client from '@/config/apollo-client';
import { getProfileUrl } from '@/libs/get-urls';
import { gql } from '@apollo/client';
import { getImageMetadata } from '@/libs/get-image-url';

export default function ProfilesPage({ profiles }) {
  return (
    <Layout title="Profiles">
      <h1>Profiles</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {profiles.map((item) => (
          <li
            className="py-3 rounded-md transition-shadow hover:shadow-lg"
            key={item.id}
          >
            <Link href={getProfileUrl(item.slug)}>
              <a className="hover:opacity-0">
                <p className="px-4 py-2 font-semibold text-gray-800 dark:text-gray-200">
                  {item.artName}
                </p>
                {item.avatar &&
                item.avatar.formats &&
                item.avatar.formats.medium ? (
                  <div
                    className="relative overflow-hidden "
                    style={{ paddingBottom: '100%' }}
                  >
                    <img
                      style={{ height: '100%' }}
                      className="absolute w-full h-full object-cover"
                      src={item.avatar.formats.medium.url}
                      alt={`Avatar của ${item.artName}`}
                      width={getImageMetadata(item.avatar).width}
                      height={getImageMetadata(item.avatar).height}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
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
          avatar {
            formats
          }
        }
      }
    `,
  });

  const { profiles } = data;

  return { props: { profiles } };
}
