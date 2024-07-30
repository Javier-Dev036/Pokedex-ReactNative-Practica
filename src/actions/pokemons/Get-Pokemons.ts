import { pokeApi } from "../../config/api/PokeApi";
import type { Pokemon } from "../../domain/entities/Pokemons";
import type { PokeApiPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/PokeApi.Interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/Pokemon.Mapper";

export const getPokemons = async (page: number, limit: number = 20):Promise<Pokemon[]> => {
    try {
        const url = `/pokemon?offset=${ page * 10}&limit=${limit}`;
        const { data } = await pokeApi.get<PokeApiPaginatedResponse>(url);

        const pokemonPromises = data.results.map((info) => {
            return pokeApi.get<PokeAPIPokemon>(info.url)
        });

        const pokeApiPokemons = await Promise.all(pokemonPromises);
        const pokemonsPromises = pokeApiPokemons.map(item => 
            PokemonMapper.pokeApiPokemonToEntity(item.data)
        )

        return await Promise.all(pokemonsPromises);
    } catch (error) {
        console.log(error)
        throw new Error('Error getting pokemons');
    }
}