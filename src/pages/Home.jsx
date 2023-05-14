import { useEffect, useMemo, useState } from 'react';

import { Box, Container, Grid, TextField } from '@mui/material';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import NavBar from '../components/NavBar';
import PokemonCard from '../components/PokemonCard';
import Skeletons from '../components/Skeletons';

import axios from 'axios';
import { FormatAlignJustify } from '@mui/icons-material';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsToSearch, setPokemonsToSearch] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setFilter] = useState('');
  const filteredPokemons = useMemo(() => {
    if (search !== '') {
      setPage(1);
      return pokemonsToSearch.filter(({ data }) => data.name.includes(search));
    } else {
      return pokemons.filter(({ data }) => data.name.includes(search));
    }
  }, [pokemons, search]);

  useEffect(() => {
    getTotalPages();
  }, []);

  useEffect(() => {
    getPokemons();
  }, [page]);

  const getTotalPages = () => {
    var endpoints = [];

    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then((res) => {
        setTotalPages(Math.ceil(res.data.count / 30));

        for (var i in res.data.results) {
          endpoints.push(res.data.results[i].url);
        }

        axios
          .all(endpoints.map((endpoint) => axios.get(endpoint)))
          .then((res) => {
            setPokemonsToSearch(res);
          })
          .catch((err) => console.log(err));
      });
  };

  const getPokemons = () => {
    var endpoints = [];
    let offSet = page * 30 - 29;
    let limit = page * 30;

    for (var i = offSet; i < limit; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setPokemons(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <NavBar />
      <Box sx={{ ml: 3, mb: 1, mr: 3 }}>
        <TextField
          id="standard-basic"
          label="Digite o nome do pokemon que busca"
          sx={{ width: '100%' }}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Stack spacing={1}>
          <Pagination
            page={page}
            count={totalPages}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
            onChange={(e, newPage) => {
              setPage(newPage);
            }}
          />
        </Stack>
      </Box>
      <Container maxWidth="100%">
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
