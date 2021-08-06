import Layout from '@/components/layout';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';

export default function Home() {
  return (
    <Layout title="Trang chủ" useImageBanner={true}>
      <h1>Trang chủ</h1>
    </Layout>
  );
}
