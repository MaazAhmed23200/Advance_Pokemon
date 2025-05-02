import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/PokemonDetails">PokemonDetails</Link></li>
        <li><Link to="/favorites">Favorites</Link></li> 
      </ul>
    </nav>
  );
}

export default Navbar;

