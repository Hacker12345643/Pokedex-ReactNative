import { SafeAreaView } from "react-native";
import React, {useCallback, useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import { getPokemonsApi, getPokemonDetailsByUrlApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";
import { initial } from "lodash";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = useCallback( async () => {
    try {
      //Inicializamos la carga del request
      setLoading(true);
      const {results:pokemonsResponse, next:nextPokemonListUrl} = await getPokemonsApi(nextUrl);
      setNextUrl(nextPokemonListUrl);

      const pokemonsArray = [];

      for await (const pokemon of pokemonsResponse) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_shiny,
        });
      }
      //console.log(pokemonsArray);
      //spring interator añade la info de los arrays a  otro array, sin modificar los valores de los arrays que hay dentro
      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
    //regresamos loading a false
    finally{
      setLoading(false);
    }
  }, [pokemons, nextUrl]);

  return (
    <SafeAreaView>
      <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={nextUrl} isLoading={loading}/>
    </SafeAreaView>
  );
}
