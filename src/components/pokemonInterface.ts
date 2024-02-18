export interface pokemonInterface {
    name: string
    id: number
    sprites: {front_default: string}
    types: {type: {name: string}}[]
    weight: number
    height: number
}
