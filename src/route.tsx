import Dashboard from './pages/home';
import Login from './components/login/login';
import OwnersDidpaly from './pages/owners';
import UsersActivation from './pages/users-activation';
import OwnerDetailsPage from './pages/owner-details';
import PlayersDisplay from './pages/players';
import PlayerDetails from './pages/player-details';
import PlaygroundDetails from './pages/playground-details';


export const routers = [
  {
    path: '/',
    element: <Login/>,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/active-owners',
    element: <OwnersDidpaly />,
  },
  {
    path: "/unactive-owners",
    element: <UsersActivation />,
  },
  {
    path: "/active-players",
    element: <PlayersDisplay />,
  },
  {
    path: "/player/:id",
    element: <PlayerDetails/>,
  },
  {
    path: "/owner/:id",
    element: <OwnerDetailsPage />,
  },
  {
    path: "/playground/:stadiumId",
    element: <PlaygroundDetails/>
  },
  {
    path: "*",
    element: <h2 className='text-center'>Page Not Found</h2>
  }
]
