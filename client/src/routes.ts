import { FC } from 'react';

// pages
import Chat from 'components/Chat';
import Profile from 'components/Profile';

interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
};

export const routes: Array<Route> = [
  {
    key: 'chat-route',
    title: 'Chat',
    path: '/',
    enabled: true,
    component: Chat,
  },
  {
    key: 'profile-route',
    title: 'Profile',
    path: '/',
    enabled: true,
    component: Profile,
  },
];