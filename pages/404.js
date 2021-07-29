import Link from 'next/link';
import Layout from '@/components/layout';

export default function Home() {
  return (
    <Layout title="Lỗi 404: Không tìm thấy">
      <h1 className="text-2xl font-bold">Lỗi 404</h1>
      <p>Không tìm thấy</p>
      <Link href="/">Quay về trang chủ</Link>
    </Layout>
  );
}
