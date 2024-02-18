
import CorrectPokemonCard from './CorrectPokemonCard'
import GuessCard from './GuessCard'
import { pokemonInterface } from './pokemonInterface'

interface pokemonProps{
    correctPokemon: pokemonInterface
    guessedPokemon: pokemonInterface
}

const PokemonCard = ({correctPokemon, guessedPokemon }: pokemonProps) => {

  return (
    <div key={correctPokemon.id}>

        {correctPokemon?.name === guessedPokemon?.name ? <CorrectPokemonCard pokemon={correctPokemon}/>
        : <GuessCard guessedPokemon={guessedPokemon} correctPokemon={correctPokemon}/>}
    </div>
  )
}

export default PokemonCard