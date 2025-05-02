import { useEffect, useState } from "react";
import "../component/Card1.css";
import Card from "../component/Card1";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const API = "https://pokeapi.co/api/v2/pokemon?limit=150";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const toggleFavorite = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const searchData = pokemon.filter((curPokemon) => {
    const searchLower = search.toLowerCase();
    const matchesName = curPokemon.name.toLowerCase().includes(searchLower);
    const matchesId = curPokemon.id.toString().includes(searchLower);
    const matchesType = curPokemon.types.some((typeObj) =>
      typeObj.type.name.toLowerCase().includes(searchLower)
    );
    const matchesMoves = curPokemon.moves.some((moveObj) =>
      moveObj.move.name.toLowerCase().includes(searchLower)
    );

    return matchesName || matchesId || matchesType || matchesMoves;
  });

  const totalPages = Math.ceil(searchData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPokemon = searchData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <h1>Loading....</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <section className="container">
      <header>
        <h1>Pokemon</h1>
      </header>

      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search by name, ID, type, or move..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); 
          }}
        />
      </div>

      {searchData.length === 0 ? (
        <h2>No Pokemon match your search</h2>
      ) : (
        <>
          <ul className="cards">
            {currentPokemon.map((curPokemon) => (
              <Card
                key={curPokemon.id}
                pokemonData={curPokemon}
                isFavorite={favorites.includes(curPokemon.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </ul>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Home;