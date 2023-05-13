import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import Skeletons from "../components/Skeletons";
import axios from "axios";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 1000; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setPokemons(res);
        setFilteredPokemons(res);
      })
      .catch((err) => console.log(err));
  };

  const pokemonFilter = (name) => {
    var filteredPokemons = [];

    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name))
        filteredPokemons.push(pokemons[i]);
    }
    setFilteredPokemons(filteredPokemons);
  };

  return (
    <div>
      <NavBar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {filteredPokemons.length === 0 ? (
            <Skeletons />
          ) : (
            filteredPokemons.map((pokemon, key) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                  <PokemonCard
                    name={pokemon.data.name}
                    imageURL={pokemon.data.sprites.front_default}
                    types={pokemon.data.types}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
