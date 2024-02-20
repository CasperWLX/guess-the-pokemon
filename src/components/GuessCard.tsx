import React, { useEffect, useState } from 'react';
import { downArrow, upArrow } from '../constants';
import { pokemonInterface } from './pokemonInterface';

interface pokemonProps {
    correctPokemon: pokemonInterface;
    guessedPokemon: pokemonInterface;
    numberOfTries: number;
}

const GuessCard = ({ correctPokemon, guessedPokemon, numberOfTries }: pokemonProps) => {

    const correctPokemonTypes = correctPokemon.types.map((type) => type.type.name)

    const guessedPokemonTypes = guessedPokemon.types.map((type) => type.type.name);

    const commonTypes = correctPokemonTypes.filter(type => guessedPokemonTypes.includes(type))

    const [blurAmount, setBlurAmount] = useState(5);

    let typeStyle: React.CSSProperties = {
        backgroundColor: ''
    };

    const calculateDifferenceStyle = (difference: number): string => {
        if (difference > 0) return `url(${downArrow})`;
        if (difference < 0) return `url(${upArrow})`;
        return 'undefined';
    };

    const heightDifference = guessedPokemon.height - correctPokemon.height;
    const weightDifference = guessedPokemon.weight - correctPokemon.weight;

    const heightBackground = calculateDifferenceStyle(heightDifference);
    const weightBackground = calculateDifferenceStyle(weightDifference);

    const heightStyle: React.CSSProperties = {
        backgroundImage: heightBackground ? weightBackground : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundColor: heightDifference === 0 ? 'green' : '#242424',
    };

    const weightStyle: React.CSSProperties = {
        backgroundImage: weightBackground ? weightBackground : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundColor: weightDifference === 0 ? 'green' : '#242424',
    };

    if (commonTypes.length < 1) {
        typeStyle = {
            backgroundColor: 'red'
        }
    } else {
        typeStyle = {
            backgroundColor: 'green'
        }
    }

    const spriteStyle: React.CSSProperties = {
        height: '50px',
        width: 'auto',
        filter: `grayscale(100%) brightness(0%) contrast(1000%) blur(${blurAmount}px)`,
    }

    useEffect(() => {
        if (numberOfTries % 5 === 0 && blurAmount > 0) {
            setBlurAmount(blurAmount - 1);
            console.log(blurAmount)
        }
    }, [numberOfTries])



    return (
        <>
            <div id='guess-box'>
                <p className='small-box'>{guessedPokemon.name}</p>
                <div className='small-box'>
                    <p >{guessedPokemon.height * 10}cm</p>
                    <p style={heightStyle}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                </div>
                <div className='small-box'>
                    <p>{guessedPokemon.weight / 10}kg</p>
                    <p style={weightStyle}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                </div>
                {commonTypes.length > 0 ? commonTypes.map((type) => <p key={type} className='small-box' style={typeStyle}>{type}</p>)
                    : guessedPokemon.types.map((type) => <p key={type.type.name} className='small-box' style={typeStyle}>{type.type.name}</p>)}
            </div>
            <div id='blurry-image-box'>
                <p>WHO'S THAT POKEMON?</p>
                <div className='image-box'>
                    <img src={correctPokemon.sprites.front_default} alt={correctPokemon.sprites.front_default} style={spriteStyle} />
                </div>
            </div>
        </>
    )
}

export default GuessCard 