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

    const guessedPokemonTypes: string[] = guessedPokemon.types.map((type) => type.type.name);

    const [blurAmount, setBlurAmount] = useState(5);

    const isCorrectType = (type: string) => correctPokemonTypes.includes(type);

    if (correctPokemonTypes.length == 1) {
        correctPokemonTypes.push('none')
    }
    if (guessedPokemonTypes.length == 1) {
        guessedPokemonTypes.push('none')
    }

    const getTypeStyle = (type: string) => {
        return {
            backgroundColor: isCorrectType(type) ? 'green' : 'red'
        };
    };

    const typeStyle1 = getTypeStyle(guessedPokemonTypes[0])
    const typeStyle2 = getTypeStyle(guessedPokemonTypes[1]);

    const heightDifference = guessedPokemon.height - correctPokemon.height;
    const weightDifference = guessedPokemon.weight - correctPokemon.weight;

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
            <div>
                <p>These arrows will indicate whether the mysterious pokemon is lighter <img src={downArrow} alt="Down-arrow" /> or heavier <img src={upArrow} alt="Up-arrow" /></p>
            </div>
            <div id='guess-box'>
                <div className='small-box'>
                    <img src={guessedPokemon.sprites.front_default} alt="" />
                </div>
                <div className='small-box'>
                    <h2>{guessedPokemon.height * 10}cm</h2>
                    {heightDifference > 0 ? <img src={downArrow} alt='down arrow' /> : <img src={upArrow} alt='up arrow' />}
                </div>
                <div className='small-box'>
                    <h2>{guessedPokemon.weight / 10}kg</h2>
                    {weightDifference > 0 ? <img src={downArrow} alt='down arrow' /> : <img src={upArrow} alt='up arrow' />}
                </div>
                <div className='small-box' style={typeStyle1}>
                    <h2>{guessedPokemonTypes[0].toUpperCase()}</h2>
                </div>
                <div className='small-box' style={typeStyle2}>
                    {guessedPokemonTypes.length > 1 ? <h2>{guessedPokemonTypes[1].toUpperCase()}</h2> : <h2>NONE</h2>}
                </div>
            </div>
            <div id='blurry-image-box'>
                <h2>?????</h2>
                <div className='image-box'>
                    <img src={correctPokemon.sprites.front_default} alt={correctPokemon.sprites.front_default} style={spriteStyle} />
                </div>
            </div>
        </>
    )
}

export default GuessCard 