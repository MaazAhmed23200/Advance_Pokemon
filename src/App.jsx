import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import Favorites from './pages/Favorites'; 
import Navbar from './component/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PokemonDetails" element={<PokemonDetails />} /> 
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;


