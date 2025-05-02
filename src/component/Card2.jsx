import './Card2.css';

const Card2 = ({ pokemonData, isFavorite, toggleFavorite }) => {
  return (
    <li className="pokemon-card">
      <figure>
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </figure>

      <div className="grid-three-cols">
  <p className="pokemon-info">
    <span>Id:</span> {pokemonData.id}
  </p>

  <p className="pokemon-type">
    <span>Type: </span>
    {pokemonData.types.map((curType) => curType.type.name).join(", ")}
  </p>

  <p className="pokemon-name">
    <span>Name: </span> {pokemonData.name}
  </p>
</div>


      <div className="grid-three-cols">
  <p className="pokemon-info">
    <span>HP: </span>
    {pokemonData.stats.find((stat) => stat.stat.name === "hp")?.base_stat}
  </p>

  <p className="pokemon-attack">
    <span>Attack: </span>
    {pokemonData.stats.find((stat) => stat.stat.name === "attack")?.base_stat}
  </p>

  <p className = "pokemon-defence">
    <span>Defense: </span>
    {pokemonData.stats.find((stat) => stat.stat.name === "defense")?.base_stat}
  </p>
</div>

      <div className="grid-two-cols">
      <p className = "pokemon-abilities">
    <span>Abilities:</span>{" "}
    {pokemonData.abilities
      .map((abilityObj) => abilityObj.ability.name)
      .join(", ")}
  </p>

  <p className = "pokemon-moves">
    <span>Moves:</span>{" "}
    {pokemonData.moves
      .slice(0, 5) 
      .map((moveObj) => moveObj.move.name)
      .join(", ")}
  </p>
  </div>

    </li>
  );
};

export default Card2;


