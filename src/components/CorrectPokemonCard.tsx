import { pokemonInterface } from "./pokemonInterface";

interface pokemonProps {
    pokemon: pokemonInterface;
}

const CorrectPokemonCard = ({ pokemon }: pokemonProps) => {
    return (
        <div>
            <div id="pokemon-card">
                <div id="pokemon-text">
                    <p>ID: {pokemon.id}</p>
                    <p>Name: {pokemon.name}</p>
                    <p>Weight: {pokemon.weight / 10}kg</p>
                    <p>Height: {pokemon.height * 10}cm</p>
                    {pokemon.types.length > 1 ? (
                        <p>
                            Types:{" "}
                            {pokemon.types.map((type, index) => (
                                <span key={type.type.name}>
                                    {index === pokemon.types.length - 1
                                        ? type.type.name
                                        : type.type.name + ", "}
                                </span>
                            ))}
                        </p>
                    ) : (
                        pokemon.types.map((type) => (
                            <p key={type.type.name}>Type: {type.type.name}</p>
                        ))
                    )}
                </div>

                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    id="pokemon-img"
                />
            </div>
            <div>
                <h2>Refresh page to restart</h2>
            </div>
        </div>
    );
};

export default CorrectPokemonCard;
