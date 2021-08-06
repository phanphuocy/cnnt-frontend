import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import classNames from '@/libs/classnames';
import { RiSearchLine } from 'react-icons/ri';
import { Switch } from '@headlessui/react';
import useDarkMode from '@/hooks/use-dark-mode';
import cn from '@/libs/classnames';
import { getImageLargestAvailable } from '@/libs/get-image-largest-available';

/* import contexts */
import AuthContext from '@/contexts/AuthContext';

/* import toast container, for once */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* import icons */
import {
  RiMvLine,
  RiMvFill,
  RiUserSmileLine,
  RiUserSmileFill,
  RiFilmLine,
  RiFilmFill,
} from 'react-icons/ri';

const DiscoveryNavLink = ({ href, lineIcon, fillIcon, isActive, label }) => {
  return (
    <Link href={href}>
      <a
        className={classNames(
          isActive ? 'bg-gray-200 dark:bg-gray-700' : '',
          'flex gap-4 py-2.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-800 rounded'
        )}
      >
        {isActive ? fillIcon : lineIcon}
        <span>{label}</span>
      </a>
    </Link>
  );
};

export default function Layout({
  title,
  description,
  keywords,
  children,
  useImageBanner,
  imageBanner,
}) {
  /* handle display */
  const [openedMenu, setOpenedMenu] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [colorTheme, setColorTheme] = useDarkMode();

  const router = useRouter();
  const { asPath } = router;

  function openMenuBtnHandler(e) {
    setOpenedMenu(!openedMenu);
  }

  /* handle logic */
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <ToastContainer position="bottom-center" />
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
            'bg-gray-50 dark:bg-gray-900 dark:border-r-2 dark:border-gray-800 w-64 space-y-4 absolute z-50 inset-y-0 left-0 transform transition duration-200 ease-in-out lg:relative lg:translate-x-0'
          )}
        >
          <div className="sticky top-0 px-2 py-6 ">
            <Link href="/">
              <a className="flex items-center space-x-2 px-3">
                <span className="text-xl font-bold">Chủ Nhật Nhạc Thái</span>
              </a>
            </Link>
            <p className="text-sm px-4 pt-3 opacity-70">Khám phá</p>
            <nav>
              <DiscoveryNavLink
                href="/music-videos"
                label="Music Videos"
                lineIcon={<RiMvLine size={24} />}
                fillIcon={<RiMvFill size={24} />}
                isActive={asPath.startsWith('/music-videos')}
              />
              <DiscoveryNavLink
                href="/profiles"
                label="Profiles"
                lineIcon={<RiUserSmileLine size={24} />}
                fillIcon={<RiUserSmileFill size={24} />}
                isActive={asPath.startsWith('/profiles')}
              />
              <DiscoveryNavLink
                href="/short-films"
                label="Phim ngắn"
                lineIcon={<RiFilmLine size={24} />}
                fillIcon={<RiFilmFill size={24} />}
                isActive={asPath.startsWith('/short-films')}
              />
            </nav>
          </div>
        </div>

        {/* content */}
        <div className="relative flex-1 divide-y dark:divide-gray-800">
          {useImageBanner && (
            <img
              className="dark:filter dark:brightness-75"
              src={
                imageBanner
                  ? getImageLargestAvailable(imageBanner).url
                  : 'https://dummyimage.com/1920x500/e09d89/0a0a0a'
              }
              alt={`${title} banner image`}
              width="100%"
              height="auto"
            />
          )}
          <div
            className={cn(
              useImageBanner ? 'absolute top-0 left-0 w-full' : '',
              'hidden md:flex md:justify-between md:items-center px-24 py-3'
            )}
          >
            <form className="flex rounded-md">
              <input
                className="border-2 border-gray-200 dark:border-gray-800 rounded-l-md w-96 px-3 py-1 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                type="search"
              />
              <button className="flex items-center justify-center h-full px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-r-md">
                <RiSearchLine size={18} />
              </button>
            </form>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span>Chế độ tối</span>
                <Switch
                  checked={colorTheme === 'light' ? true : false}
                  onChange={() =>
                    colorTheme === 'light'
                      ? setColorTheme('dark')
                      : setColorTheme('light')
                  }
                  className={`${
                    colorTheme === 'light' ? 'bg-gray-200' : 'bg-gray-600'
                  } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                  <span className="sr-only">Chế độ tối</span>
                  <span
                    className={`${
                      colorTheme === 'light' ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full`}
                  />
                </Switch>
              </div>
              <div>
                {user ? (
                  /* if is logged in in */
                  <button
                    className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 rounded-md px-3 py-2"
                    onClick={() => logout()}
                  >
                    Đăng xuất
                  </button>
                ) : (
                  /* if not logged in */
                  <Link href="/member/login">
                    <a className="bg-orange-500 border-bottom border-b-orange-600 px-3 py-2 rounded-md shadow-sm font-bold text-white">
                      Đăng nhập
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
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
