import React, { useEffect, useState } from 'react'
import { pokemonInterface } from './pokemonInterface';
import axios from 'axios';
import PokemonCard from './PokemonCard';


const PokemonForm = () => {

    const [inputValue, setInputValue] = useState('');
    const [pokemon, setPokemon] = useState<pokemonInterface | null>(null);
    const [correctPokemon, setCorrectPokemon] = useState<pokemonInterface | null>(null)
    const [numberOfGuesses, setGuessCount] = useState(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const lowerCaseInput = inputValue.toLowerCase();
        event.preventDefault();
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerCaseInput}/`);

        if (response.status === 200) {
            setPokemon(response.data);
            console.log(pokemon);
            setGuessCount(numberOfGuesses + 1);
        } else {
            setPokemon(null)
        }

        setInputValue('');
    }

    const pickRandomPokemon = (min: number, max: number) => {
        return (
            Math.floor(Math.random() * (max - min + 1)) + min
        )
    }

    useEffect(() => {
        const getRandomPokemon = async () => {
            const randomNumber = pickRandomPokemon(1, 151);

            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`)

            if (response.status === 200) {
                setCorrectPokemon(response.data)
            }
        }

        getRandomPokemon();
    }, [])

    return (
        <div>

            <h1>
               WHO'S THAT POKEMON?
            </h1>
            <h2>Number of guesses: {numberOfGuesses}</h2>
            <form onSubmit={handleSubmit} className='input-container'>
                <input type="text" value={inputValue} onChange={handleInputChange} id='input-box' />
                <button type='submit'>Make a guess</button>
            </form>


            <div id='pokemon-box'>
                {pokemon && correctPokemon && <PokemonCard correctPokemon={correctPokemon} guessedPokemon={pokemon} numberOfTries={numberOfGuesses} />}
            </div>

        </div>
    )
}

export default PokemonForm