import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import classNames from '@/libs/classnames';

export default function Layout({ title, description, keywords, children }) {
  const [openedMenu, setOpenedMenu] = useState(false);

  function openMenuBtnHandler(e) {
    setOpenedMenu(!openedMenu);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className="relative min-h-screen md:flex dark:bg-gray-900 dark:text-white ">
        {/* mobile menu bar */}
        <div className="dark:bg-gray-800 p-4 flex items-center justify-between md:hidden">
          {/* logo */}
          <Link href="/">
            <a>Home</a>
          </Link>
          <button
            className="p-1 focus:outline-none focus:bg-gray-700"
            onClick={openMenuBtnHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* nav */}
        </div>

        {/* sidebar */}
        <div
          className={classNames(
            !openedMenu ? '-translate-x-full' : null,
            'bg-gray-50 dark:bg-gray-800 w-64 space-y-4 absolute z-50 inset-y-0 left-0 transform transition duration-200 ease-in-out lg:relative lg:translate-x-0'
          )}
        >
          <div className="sticky top-0 px-2 py-6 ">
            <Link href="/">
              <a className="flex items-center space-x-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-xl font-bold">CNNT</span>
              </a>
            </Link>
            {/* <nav>
            <a href="#" className="block py-2.5 px-4  dark:hover:bg-gray-700 rounded">
              Góc tìm hiểu
            </a>
            <a href="#" className="block py-2.5 px-4 dark:hover:bg-gray-700 rounded">
              Góc khám phá
            </a>
            <a href="#" className="block py-2.5 px-4 dark:hover:bg-gray-700 rounded">
              Góc phim ngắn
            </a>
            <a href="#" className="block py-2.5 px-4 dark:hover:bg-gray-700 rounded">
              Góc giới thiệu phim
            </a>
          </nav> */}
            <p className="text-sm px-4 pt-3 opacity-70">Khám phá</p>
            <nav>
              <Link href="/music-videos">
                <a
                  href="#"
                  className="block py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Music videos
                </a>
              </Link>
              <Link href="/profiles">
                <a
                  href="#"
                  className="block py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Profiles
                </a>
              </Link>
              <a
                href="#"
                className="block py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Hãng thu âm
              </a>
              <a
                href="#"
                className="block py-2.5 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Playlist
              </a>
            </nav>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 divide-y dark:divide-gray-800">
          <div className="hidden md:block px-8 py-4">Placeholder</div>
          <div className="px-4 md:px-12 lg:px-24 py-8 md:py-12">{children}</div>
        </div>
      </div>
    </>
  );
}

Layout.defaultProps = {
  title: 'No title',
  description: 'Pad Thái cho tâm hồn',
  keywords: 'nhạc Thái',
};
