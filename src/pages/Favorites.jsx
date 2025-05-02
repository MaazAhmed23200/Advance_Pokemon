import { useEffect, useState } from "react";
import Card from "../component/Card1";
import "../component/Card1.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    const parsed = stored ? JSON.parse(stored) : [];
    setFavorites(parsed);
  }, []);


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const responses = await Promise.all(
          favorites.map((id) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
              res.json()
            )
          )
        );
        setFavoritePokemons(responses);
        setLoading(false);
      } catch (err) {
        console.error("Error loading favorite Pokémon:", err);
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    setFavoritePokemons((prev) => prev.filter((poke) => updated.includes(poke.id)));
  };

  if (loading) return <h2>Loading Favorites...</h2>;

  if (favorites.length === 0) return <h2 className = "fev">No favorite Pokemon yet </h2>;

  return (
    <section className="container">
      <h1>Your Favorite Pokemon </h1>
      <ul className="cards">
        {favoritePokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemonData={pokemon}
            isFavorite={favorites.includes(pokemon.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ul>
    </section>
  );
};

export default Favorites;
