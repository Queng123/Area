import { HashRouter } from 'react-router-dom';
import { RoutesManager } from './Routes';

export function App() {
  return (
    <HashRouter>
      {RoutesManager()}
    </HashRouter>
  );
}
