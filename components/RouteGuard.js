import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from 'jotai';
import { isAuthenticated } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/', '/login', '/register', '/_error'];

export default function RouteGuard(props) {
  const router = useRouter();

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    authCheck(router.pathname); // check on initial load
    updateAtoms();              // fetch favourites + history

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  // This checks if user is authenticated for protected routes
function authCheck(url) {
  // redirect to login page if accessing a private page and not logged in
  const path = url.split('?')[0];
  if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
    setAuthorized(false);
    router.push('/login');
  } else {
    setAuthorized(true);
  }
}

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return <>{props.children}</>;
}
