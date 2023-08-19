import FriendPage from '../pages/FriendPage/FriendPage';
import FriendsPage from '../pages/FriendsPage/FriendsPage';
import MessagePage from '../pages/MessagePage/MessagePage';
import OwnerPage from '../pages/OwnerPage/OwnerPage';
import PostsPage from '../pages/PostsPage/PostsPage';

export const privateRoutes = [
  {
    path: '/',
    element: <PostsPage />,
    exact: true,
  },
  {
    path: '/friends',
    element: <FriendsPage />,
    exact: true,
  },
  {
    path: '/messages',
    element: <MessagePage />,
    exact: true,
  },
  {
    path: '/mypage',
    element: <OwnerPage />,
    exact: true,
  },
  {
    path: '/friends/:_id',
    element: <FriendPage />,
    exact: true,
  },
];

export const publicRoutes = [
  {
    path: '/',
    element: <PostsPage />,
    exact: true,
  },
];
