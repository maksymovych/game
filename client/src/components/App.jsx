import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../store/store';
import RoutesList from './routs/RoutesList';
import ResponsiveAppBar from './ui/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <ResponsiveAppBar />
        <RoutesList />
      </PersistGate>
    </BrowserRouter>
  );
}

export default App;
