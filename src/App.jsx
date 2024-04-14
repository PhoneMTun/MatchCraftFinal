import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserContext from './context/UserContext';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import HomePage from './components/Pages/HomePage';
import DashboardPage from './components/Pages/DashboardPage';
import ViewProfile from './Popup/ViewProfile';
import Container from './components/container/Container';
import { WebSocketService } from './components/service/WebSocketService'; // Ensure this path is correct

function App() {
  const [skills, setSkills] = useState({});
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser);
  const [webSocketService, setWebSocketService] = useState(null);

  const saveLoggedInUser = userData => {
    const userObj = { ...userData, password: "" };
    setUser(userObj);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      // Check if webSocketService instance exists and user has a valid ID
      if (!webSocketService && user.id) {
        const wsService = new WebSocketService(user.id); // Assuming `id` is the property containing user ID
        wsService.connect();
        setWebSocketService(wsService); // Store the instance for possible future use
      }
    }
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, skills, setSkills, saveLoggedInUser }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<RegistrationPage />} />
          <Route path='/matchcraft/*' element={<Container />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
