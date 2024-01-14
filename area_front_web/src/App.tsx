import { RoutesManager } from './RoutesManager';
import { BrowserRouter } from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter>
      {RoutesManager()}
    </BrowserRouter>
  );
}
