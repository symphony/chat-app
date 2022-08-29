import { FC } from 'react';

// pages
import Home from 'components/Home';
import Profile from 'components/Profile';

interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
};

export const routes: { [key: string]: Route } = {
  home: {
    key: 'home-route',
    title: 'Home',
    path: '/',
    enabled: true,
    component: Home,
  },
  profile: {
    key: 'profile-route',
    title: 'Profile',
    path: '/profile',
    enabled: true,
    component: Profile,
  },
};