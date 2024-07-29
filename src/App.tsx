import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Container from './components/container/Container';
import Example1 from './pages/example-1/Example1';
import Example2 from './pages/example-2/Example2';
import Example3 from './pages/example-3/Example3';
import Start from './pages/start/Start';
import AddCertificate from './pages/add-certificate/AddCertificate';
import { useState } from 'react';
import { AppRoutes } from './routes/routes';

export const App: React.FC = () => {
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
                path={AppRoutes.Home}
                element={<Start />}
              />
              <Route
                path={AppRoutes.MachineLearning}
                element={<Example1 />}
              />
              <Route
                path={AppRoutes.Example1}
                element={<Example1 />}
              />
              <Route
                path={AppRoutes.Example2}
                element={<Example2 />}
              />
              <Route
                path={AppRoutes.Example3}
                element={<Example3 />}
              />
              <Route
                path={`${AppRoutes.AddCertificate}/:id?`}
                element={<AddCertificate />}
              />
            </Routes>
          </div>
        </div>
      </Container>
    </Router>
  );
};
