import React, { useEffect, useState } from 'react'
import { pokemonInterface } from './pokemonInterface';
import axios from 'axios';
import PokemonCard from './PokemonCard';


const PokemonForm = () => {

    const [inputValue, setInputValue] = useState('');
    const [pokemon, setPokemon] = useState<pokemonInterface[] | null>(null);
    const [correctPokemon, setCorrectPokemon] = useState<pokemonInterface[]>([])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        const lowerCaseInput = inputValue.toLowerCase();
        event.preventDefault();
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerCaseInput}/`);

        if(response.status === 200){
            setPokemon(response.data);
            console.log(pokemon);
        }else{
            setPokemon([])
        }
        
        setInputValue('');
    }

    const pickRandomPokemon = (min: number, max: number) => {
        return(
            Math.floor(Math.random() * (max-min + 1)) + min
        )
    }

    useEffect(() => {
        const getRandomPokemon = async() => {
            const randomNumber = pickRandomPokemon(1,151);
        
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`)
            
            if(response.status === 200){
                setCorrectPokemon(response.data)
            }
        }

        getRandomPokemon();
    }, [])

  return (
    <div>
  
        <h1>
            Guess the pokemon!
        </h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleInputChange}/>
            <button type='submit'>Make a guess</button>
        </form>


        <div id='pokemon-box'>
            {pokemon && <PokemonCard correctPokemon={correctPokemon} guessedPokemon={pokemon} />}
        </div>
        
    </div>
  )
}

export default PokemonForm