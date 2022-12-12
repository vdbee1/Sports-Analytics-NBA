import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import './App.css';
import SimulatorPage from './pages/SimulatorPage';
import { UserContextProvider } from './contexts/UserContext';
import LoginScreen from "./pages/LoginScreen"
import NoPage from './pages/NoPage';
import Layout from './pages/Layout'
import SignupScreen from './pages/SignupScreen';
import { FantasyTeamProvider } from './contexts/FantasyTeamContext';
import { AppContextProvider } from './contexts/AppContext';

function App() {
  return (
    <AppContextProvider>
      <UserContextProvider>
        <FantasyTeamProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>

                <Route index element={<Navigate to="/home" />} />
                <Route path="home" element={<Home />} />
                <Route path="loginPage" element={<LoginScreen />} />
                <Route path="signupPage" element={<SignupScreen />} />
                <Route path="simulator" element={<SimulatorPage />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FantasyTeamProvider>
      </UserContextProvider>
    </AppContextProvider>
  );
}

export default App;
