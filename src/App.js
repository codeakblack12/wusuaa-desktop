import logo from './logo.svg';
import Landing from './screens/auth/landing';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SocketContextProvider } from './context/socket';
import AuthProvider from './context/authentication';
import { ROUTES } from './index';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <HashRouter>
      <SocketContextProvider>
        <Provider store={store}>
          <AuthProvider>
            <Routes>
              {
                ROUTES.map((elem) => (
                  <Route key={elem.path} path={elem.path} element={elem.element} />
                ))
              }
            </Routes>
          </AuthProvider>
        </Provider>
      </SocketContextProvider>
    </HashRouter>
  );
}

export default App;
