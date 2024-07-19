import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Container from './components/Container/Container';
import Example1 from './pages/example-1/Example1';
import Example2 from './pages/example-2/Example2';
import Example3 from './pages/example-3/Example3';
import Start from './pages/start/Start';
import { useState } from 'react';

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Container className="container">
        <Navbar
          className="navbar"
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`overlay ${isSidebarOpen ? 'active' : ''}`}
          onClick={toggleSidebar}
        ></div>
        <div className="main">
          <Sidebar className={`sidebar ${isSidebarOpen ? 'open' : ''}`} />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={<Start />}
              />
              <Route
                path="/machine-learning"
                element={<Example1 />}
              />
              <Route
                path="/machine-learning/example1"
                element={<Example1 />}
              />
              <Route
                path="/machine-learning/example2"
                element={<Example2 />}
              />
              <Route
                path="/machine-learning/example3"
                element={<Example3 />}
              />
            </Routes>
          </div>
        </div>
      </Container>
    </Router>
  );
};
