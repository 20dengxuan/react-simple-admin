// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'virtual:uno.css';
import { Provider } from 'react-redux';
import { store, persistor } from '/@/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AliveScope } from 'react-activation';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AliveScope>
        <App />
      </AliveScope>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
);
