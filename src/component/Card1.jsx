import './Card1.css';

const Card1 = ({ pokemonData, isFavorite, toggleFavorite }) => {
  return (
    <li className="pokemon-card">
      <figure>
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </figure>

      

      <div className="favorite-btn-wrapper">
    <button className="fav-btn" onClick={() => toggleFavorite(pokemonData.id)}>
      {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorite"}
    </button>
  </div>
    </li>
  );
};

export default Card1;
