import Link from 'next/link';
import { getMusicVideoUrl } from '@/libs/get-urls';
import Layout from '@/components/layout';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import Image from 'next/image';
import { getYoutubeThumbnail } from '@/libs/get-youtube-thumbnails';

export default function MusicVideosPage({ musicVideos }) {
  return (
    <Layout title="Music Videos">
      <ul className="md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {musicVideos.map((item) => (
          <li className="pb-4" key={item.id}>
            <Link href={getMusicVideoUrl(item.slug)}>
              <a>
                <div className="relative z-0">
                  <Image
                    className="rounded-md z-0 object-cover"
                    placeholder="blur"
                    blurDataURL={getYoutubeThumbnail(
                      item.youtubeVideoId,
                      'low'
                    )}
                    src={getYoutubeThumbnail(item.youtubeVideoId, 'high')}
                    alt="Picture of the author"
                    layout="responsive"
                    width={480}
                    height={Math.floor((480 * 9) / 16)}
                  />
                </div>
                <p className="pt-2 text-2xl">{item.thaiTitle}</p>
                <p className="">{item.englishTitle}</p>
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
        musicVideos {
          thaiTitle
          englishTitle
          youtubeVideoId
          id
          slug
        }
      }
    `,
  });

  const { musicVideos } = data;

  return { props: { musicVideos } };
}
