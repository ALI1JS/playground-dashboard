import { RouteObject } from "react-router-dom";
import Dashboard from './pages/home';
import Login from './components/login/login';
import OwnersDidpaly from './pages/owners';
import UsersActivation from './pages/users-activation';
import OwnerDetailsPage from './pages/owner-details';
import PlayersDisplay from './pages/players';
import PlayerDetails from './pages/player-details';
import PlaygroundDetails from './pages/playground-details';
import AddCatogeryPage from './pages/add-catogery-page';
import ViewCatogeryPage from './pages/catogeries';
import AddBannerPage from './pages/add-banner-page';
import ViewBannerPage from './pages/banners';
import PlaygroundPage from './pages/playgrounds.pages';
import CreateAdmin from './pages/create-admin';
import ViewAdmins from './pages/view-admins';
import CreateOwner from './pages/create-owner';
import CreatePlayer from './pages/create-player';
import PLayerReservtion from './pages/player-reservtion';
import Chat from './pages/chat';
import Report from './components/reports/year-report';
import ProtectedRoute from './components/protect-routes';

export const routers: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />, // Wrap protected routes
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/active-owners', element: <OwnersDidpaly /> },
      { path: '/unactive-owners', element: <UsersActivation /> },
      { path: '/active-players', element: <PlayersDisplay /> },
      { path: '/player/:id', element: <PlayerDetails /> },
      { path: '/owner/:id', element: <OwnerDetailsPage /> },
      { path: '/playground/:stadiumId', element: <PlaygroundDetails /> },
      { path: '/add-catogery', element: <AddCatogeryPage /> },
      { path: '/catogeries', element: <ViewCatogeryPage /> },
      { path: '/add-banner', element: <AddBannerPage /> },
      { path: '/banners', element: <ViewBannerPage /> },
      { path: '/playgrounds', element: <PlaygroundPage /> },
      { path: '/admin/create', element: <CreateAdmin /> },
      { path: '/admin/view', element: <ViewAdmins /> },
      { path: '/user/owner/create', element: <CreateOwner /> },
      { path: '/user/player/create', element: <CreatePlayer /> },
      { path: '/player/reservation/:id', element: <PLayerReservtion /> },
      { path: '/report', element: <Report /> },
      { path: '/chat', element: <Chat /> },
    ],
  },
  {
    path: '*',
    element: <h2 className='text-center text-blue-600 text-2xl'>Page Not Found</h2>,
  },
];
