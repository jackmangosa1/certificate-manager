import './App.css';
import Navbar from './components/Navbar/Navbar';
import Container from './components/Container/Container';

export const App = () => {
  return (
    <Container className="container">
      <Navbar />
    </Container>
  );
};
