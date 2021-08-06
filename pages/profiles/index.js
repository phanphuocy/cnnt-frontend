import Layout from '@/components/layout';
import Link from 'next/link';
import client from '@/config/apollo-client';
import { getProfileUrl, getSpotifyUrl } from '@/libs/get-urls';
import { gql } from '@apollo/client';
import { getImageMetadata } from '@/libs/get-image-url';
import { RiSpotifyLine } from 'react-icons/ri';
import { getImageLargestAvailable } from '@/libs/get-image-largest-available';

export default function ProfilesPage({
  soloFemales,
  soloMales,
  boyBands,
  girlBands,
  coExBands,
  unsorted,
}) {
  return (
    <Layout title="Profiles" useImageBanner={true}>
      <h1 className="hidden">Profiles</h1>
      <Row items={soloFemales} title="Female Soloists" />
      <Row items={soloMales} title="Male Soloists" />
      <Row items={boyBands} title="Boy Bands/ Groups" />
      <Row items={girlBands} title="Girl Bands/ Groups" />
      <Row items={coExBands} title="Co Ex Bands" />
      <Row items={unsorted} title="Unsorted" />
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
          category
          spotify
        }
      }
    `,
  });

  const { profiles } = data;

  let soloFemales = [],
    soloMales = [],
    boyBands = [],
    girlBands = [],
    coExBands = [],
    unsorted = [];

  profiles.forEach((profile) => {
    switch (profile.category) {
      case 'maleSoloist':
        soloMales.push(profile);
        break;
      case 'femaleSoloist':
        soloFemales.push(profile);
        break;
      case 'boyBand':
        boyBands.push(profile);
        break;
      case 'girlBand':
        girlBands.push(profile);
        break;
      case 'boyGroup':
        boyBands.push(profile);
        break;
      case 'girlGroup':
        girlBands.push(profile);
        break;
      case 'coExBand':
        coExBands.push(profile);
        break;
      default:
        unsorted.push(profile);
        break;
    }
  });

  return {
    props: { soloFemales, soloMales, boyBands, girlBands, coExBands, unsorted },
  };
}

const Row = ({ title = 'Untitled', items }) => {
  return (
    <>
      <h2 className="text-2xl mt-8 mb-2 font-semibold">{title}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pb-8">
        {items.map((item) => (
          <li className="rounded-md" key={item.id}>
            <Link href={getProfileUrl(item.slug)}>
              <a className="hover:opacity-0">
                <div className="flex justify-between items-center">
                  <p className="py-2 font-semibold text-gray-800 dark:text-gray-200">
                    {item.artName}
                  </p>
                  {item.spotify && (
                    <Link href={getSpotifyUrl(item.spotify)} size={24}>
                      <a>
                        <RiSpotifyLine />
                      </a>
                    </Link>
                  )}
                </div>
                {/* {item.avatar &&
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
                   */}
                {item.avatar ? (
                  <div
                    className="relative overflow-hidden "
                    style={{ paddingBottom: '100%' }}
                  >
                    <img
                      style={{ height: '100%' }}
                      className="absolute w-full h-full object-cover"
                      src={getImageLargestAvailable(item.avatar).url}
                      alt={`Avatar của ${item.artName}`}
                      width={getImageLargestAvailable(item.avatar).width}
                      height={getImageLargestAvailable(item.avatar).height}
                    />
                  </div>
                ) : (
                  <div
                    className="relative overflow-hidden"
                    style={{ paddingBottom: '100%' }}
                  >
                    <div className="bg-gray-100 w-full h-full top-0 left-0 absolute"></div>
                  </div>
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
