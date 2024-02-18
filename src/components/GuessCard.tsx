import downArrow from '../assets/down-arrow.svg'
import upArrow from '../assets/up-arrow.svg'
import { pokemonInterface } from './pokemonInterface';

interface pokemonProps{
    correctPokemon: pokemonInterface;
    guessedPokemon: pokemonInterface;
}

const GuessCard = ({correctPokemon, guessedPokemon}: pokemonProps ) => {

    const correctPokemonTypes = correctPokemon.types.map((type) => type.type.name)

    const guessedPokemonTypes = guessedPokemon.types.map((type) => type.type.name);

    const commonTypes = correctPokemonTypes.filter(type => guessedPokemonTypes.includes(type))

    const calculateDifferenceStyle = (difference: number): string => {
        if (difference > 0) return `url(${downArrow})`;
        if (difference < 0) return `url(${upArrow})`;
        return '';
    };

    const heightDifference = guessedPokemon.height - correctPokemon.height;
    const weightDifference = guessedPokemon.weight - correctPokemon.weight;

    const heightBackground = calculateDifferenceStyle(heightDifference);
    const weightBackground = calculateDifferenceStyle(weightDifference);

    const heightStyle: React.CSSProperties = {
        backgroundImage: heightBackground ? heightBackground : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundColor: heightDifference === 0 ? 'green' : '#242424'
    };

    const weightStyle: React.CSSProperties = {
        backgroundImage: weightBackground ? weightBackground : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundColor: weightDifference === 0 ? 'green' : '#242424'
    };

    const typeStyle: React.CSSProperties = {
        backgroundColor: 'green'
    };


  return (
    <div id='guess-box'>
        <p style={heightStyle} id='small-box'>{guessedPokemon.height * 10}cm</p>
        <p style={weightStyle} id='small-box'>{guessedPokemon.weight / 10}kg</p>
        {commonTypes.map((type) => <p key={type} id='small-box' style={typeStyle}>{type}</p>)}
    </div>
  )
}

export default GuessCard