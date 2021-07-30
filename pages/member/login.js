import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import { toast } from 'react-toastify';

/* import contexts */
import AuthContext from '@/contexts/AuthContext';

export default function MusicVideosPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    login({ email, password });
  }

  useEffect(() => error && toast.error(error), [error]);

  return (
    <Layout title="Đăng ký">
      <div className="w-96 mx-auto">
        <div className="py-6 text-center">
          <h1 className="font-bold text-3xl mb-2">Đăng nhập</h1>
          <p>
            Hoặc nếu bạn chưa có tài khoản,{' '}
            <Link href="/member/register">
              <a className="text-orange-600 underline">đăng ký</a>
            </Link>
          </p>
        </div>
        <div className="">
          <form
            className="dark:bg-gray-900 border border-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-500"
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-gray-200 dark:border-gray-800 dark:bg-gray-900 border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <button
              className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
