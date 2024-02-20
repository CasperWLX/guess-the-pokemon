import CorrectPokemonCard from "./CorrectPokemonCard";
import GuessCard from "./GuessCard";
import { pokemonInterface } from "./pokemonInterface";

interface pokemonProps {
    correctPokemon: pokemonInterface;
    guessedPokemon: pokemonInterface;
    numberOfTries: number;
}

const PokemonCard = ({ correctPokemon, guessedPokemon, numberOfTries }: pokemonProps) => {
    return (
        <div key={correctPokemon.id}>
            {correctPokemon?.name === guessedPokemon?.name ? (
                <CorrectPokemonCard pokemon={correctPokemon} />
            ) : (
                <GuessCard
                    guessedPokemon={guessedPokemon}
                    correctPokemon={correctPokemon}
                    numberOfTries={numberOfTries}
                />
            )}
        </div>
    );
};

export default PokemonCard;
