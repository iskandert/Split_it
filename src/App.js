import React from 'react';
// import { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Button from '@mui/material/Button';
import { AppBar, Container, CssBaseline, Grid, Link, Paper, ThemeProvider, Typography, } from '@mui/material';
import { DataUsage } from '@mui/icons-material';
import { Box } from '@mui/system';
// import './App.css';
// import calculate from './features/calculating/calculate';

const containerStyle = {
  maxWidth: {
    lg: '900px',
    xl: '1200px'
  },
}


function App() {
  // calculate();
  const asideRef = React.createRef();

  return (
    <>
      <CssBaseline />
      {/* <ThemeProvider theme> */}

      <AppBar
        elevation={3}
        sx={{ py: 0.1 }}
        position='fixed'>
        <Container fixed sx={{
          ...containerStyle,
          color: 'white',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Link href='#'
            // underline="none"
            sx={{
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              fontSize: 30,
              // flexGrow: 1,
            }}>
            <DataUsage fontSize='inherit' />
            <Typography ml={1} fontSize='inherit'>
              Split It!
            </Typography>
          </Link>
          <Button variant='outlined' sx={{
            color: 'inherit',
            borderColor: '#D6DBF6',
            ':hover': {
              // borderColor: '#9DABF6',
              // color: '#D6DBF6',
              borderColor: '#fff',
            },
          }}>New calculating</Button>
          {/* <Button variant="text" >Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button> */}
        </Container>
      </AppBar>

      <Container fixed sx={{ ...containerStyle }}>

        <Grid container columns={{ xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} spacing={1} mt={6} >
          <Grid item xl={3} lg={2} md={2} sm={2} xs={1} mb={{ xs: 2, md: 4 }} >
            <Grid container spacing={1} columns={{ xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }} >
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1} sx={{
                display: {
                  md: 'none',
                }
              }} ><Paper sx={{ height: 300, }} elevation={6} >aaa</Paper></Grid>
              {Array.from({ length: 10 }, (_, i) => <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <Paper sx={{ height: 200 }} elevation={6} >{i}</Paper>
              </Grid>)}
            </Grid>
          </Grid>
          <Grid item xl lg md sm xs sx={{
            display: {
              xs: 'none',
              md: 'block',
            }
          }}>
            <Box component="div" sx={{
              mt: -7,
              position: 'sticky',
              top: '0',
              height: '100vh',
              paddingTop: 7,
              paddingBottom: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <Paper sx={{ height: 300, }} elevation={6} ></Paper>
              <Button sx={{}} variant='contained' size='large' >calculate</Button>
            </Box>
          </Grid>
        </Grid>
        <Button sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
          position: 'fixed',
          bottom: 40,
          left: '50%',
          transform: 'translate(-50%, 0)',
        }} variant='contained' size='large' >calculate</Button>

      </Container>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
