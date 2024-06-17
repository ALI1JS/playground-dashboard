import Dashboard from './pages/home';
import Login from './components/login/login';
import OwnersDidpaly from './pages/owners';
import UsersActivation from './pages/users-activation';
import OwnerDetailsPage from './pages/owner-details';

export const routers = [
  {
    path: '/',
    element: <Login email={''} password={''} />,
    auth: false
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    auth: true
  },
  {
    path: '/all-owners',
    element: <OwnersDidpaly />,
    auth: true
  },
  {
    path: "/active-users",
    element: <UsersActivation />,
    auth: true
  },
  {
    path: "/owner/:id",
    element: <OwnerDetailsPage />,
    auth: true
  },
  {
    path: "*",
    element: <h2>Page Not Found</h2>
  }
]
