import Auth from '../components/pages/Auth/Auth';
import Game from '../components/pages/game/Game';
import GameOver from '../components/pages/game/gameOver/gameOver';
import GameWin from '../components/pages/game/gameWin/gameWin';
import GameInfo from '../components/pages/GameInfo/GameInfo';
import LogIn from '../components/pages/LogIn/LogIn';
import Main from '../components/pages/Main/Main';
import Recovery from '../components/pages/Recovery/Recovery';
import UsersScore from '../components/pages/UsersScore/UsersScore';
//GameInfo
export const routes = [
  { element: Auth, path: '/register', isPrivate: false },
  { element: LogIn, path: '/', isPrivate: false },
  { element: Recovery, path: '/recovery', isPrivate: false },
  { element: Main, path: '/main', isPrivate: true },
  { element: Game, path: '/game', isPrivate: true },
  { element: GameOver, path: '/gameOver', isPrivate: true },
  { element: GameWin, path: '/gameWin', isPrivate: true },
  { element: GameInfo, path: '/info', isPrivate: false },
  { element: UsersScore, path: '/users_score', isPrivate: true },
];
