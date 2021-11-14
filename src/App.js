import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Routes, Redirect, Navigate } from "react-router";
// import { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Button from '@mui/material/Button';
import {
  AppBar, Card, Chip, Container,
  CssBaseline, Divider, Grid, IconButton,
  Input,
  InputAdornment,
  Link, Modal, Paper, Stack, TextField, Typography,
} from '@mui/material';
import { AccountCircle, Cancel, Close, DataUsage, Groups } from '@mui/icons-material';
import { Box, typography } from '@mui/system';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
// import './App.css';
// import calculate from './features/calculating/calculate';

const containerStyle = {
  maxWidth: {
    lg: '900px',
    xl: '1200px'
  },
}

const MembersList = () => {
  const [string, setString] = React.useState('');
  const [chips, setChips] = React.useState([]);
  const onDeleteChip = e => {
    // check target of click, <svg> or <path>
    if (!e.target.parentNode.firstChild.innerHTML) chips.splice(chips.indexOf(e
      .target
      .parentNode
      .parentNode
      .firstChild
      .innerHTML), 1);
    else chips.splice(chips.indexOf(e
      .target
      .parentNode
      .firstChild
      .innerHTML), 1);
    setChips([...chips]);
  }
  const chipsCheckNPushNew = text => {
    let name = text.trim().replace(/ +/, ' ');
    if (!chips.includes(name)) {
      chips.push(name);
      setChips(chips);
    }
    setString('');
  }
  const handleInputKeyDown = e => {
    if (e.key === 'Enter' && string.length > 0) {
      chipsCheckNPushNew(string);
      setString('');
    }
  }
  const handleInputChange = e => {
    const text = e.target.value;
    if (text.slice(-1) === ',' && text.length > 1) {
      chipsCheckNPushNew(text.slice(0, -1));
    }
    else if (text.slice(-2) !== '  ') setString(text);
  }
  return (
    <Stack
      sx={{
        borderColor: grey['400'],
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 1,
        p: 1,
        width: 'max-content',
        maxWidth: '100%',
        '&:focus-within': {
          borderColor: grey['600'],
        }
      }}>
      <Box
        sx={{
          width: '100%',
          maxHeight: '285px',
          overflowY: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          m: '-2px'
        }}>
        {chips.map((chip, i) => <Chip
          sx={{
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          label={chip}
          key={i}
          onDelete={onDeleteChip}
        />)}
      </Box>
      <TextField variant="standard"
        helperText='Separate by "," or "Enter"'
        value={string}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown} />
    </Stack>
  )
}

const MembersParams = () => {
  const [num, setNum] = React.useState('1');
  const handleInputChange = e => { //WHAT THE FUCK
    console.log(e);
    const text = e.target.value;
    if (text.length <= 2) setNum(text);
  }
  return (
    <>
      <Stack alignItems='center' spacing={2} mb={2}>
        <Typography variant='h5'
          sx={{
            fontWeight: 'light',
            color: grey['700'],
          }}>
          Set the members count:
        </Typography>
        <TextField InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Groups />
            </InputAdornment>
          )
        }}
          maxWidth='150px'
          variant='standard'
          type='number'
          value={num}
          onChange={handleInputChange} //WHAT THE FUCK
          // defaultValue={10}
          helperText="Some integer less then 100" />
      </Stack>
      <Divider
        sx={{
          mb: 2,
          color: grey['700'],
          fontWeight: 'light',
          fontSize: '1.2rem',
        }}>or</Divider>
      <Stack alignItems='center' spacing={2} >
        <Typography variant='h5'
          sx={{
            textAlign: 'center',
            fontWeight: 'light',
            color: grey['700'],
          }}>{'List the members by name:'}</Typography>
        <MembersList />
      </Stack>

    </>
  )
}

const CalculatingPage = () => {
  const [isOpen, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar
        elevation={3}
        sx={{ py: 0.1 }}
        position='fixed'>
        <Container fixed
          sx={{
            ...containerStyle,
            color: 'white',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Link href='#'
            sx={{
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              fontSize: 30,
            }}>
            <DataUsage fontSize='inherit' />
            <Typography ml={1} fontSize='inherit'>
              Split It!
            </Typography>
          </Link>
          <Button variant='outlined'
            sx={{
              color: 'inherit',
              borderColor: '#D6DBF6',
              ':hover': { borderColor: '#fff' },
            }} onClick={handleOpen} >New calculation</Button>
        </Container>
      </AppBar>

      <Container fixed sx={{ ...containerStyle }}>
        <Grid container columns={{ xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} spacing={1} mt={6} >
          <Grid item xl={3} lg={2} md={2} sm={2} xs={1} mb={{ xs: 2, md: 4 }} >
            <Grid container spacing={1} columns={{ xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }} >
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1} sx={{ display: { md: 'none' } }} >
                <Paper sx={{ height: 300, }} elevation={6} >aaa</Paper>
              </Grid>
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
            <Box component="div"
              sx={{
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
        <Button
          sx={{
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

      <Modal open={isOpen} onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        }} >
        <Box
          sx={{
            width: 400,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column'
          }} >
          <Typography component='div' variant='h6'
            sx={{
              textAlign: 'center',
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit',
              textTransform: 'uppercase',
              color: 'primary.contrastText',
              width: '100%',
              py: 1,
              bgcolor: 'primary.main',
              position: 'relative',
              fontWeight: 'regular',
              '&:hover *': {
                opacity: 1,
              }
            }}>
            set calculation parameters
            <IconButton
              sx={{
                fontSize: '10px',
                position: 'absolute',
                right: 3,
                top: '50%',
                transform: 'translate(0, -50%)',
                color: 'primary.contrastText',
                opacity: 0,

              }} onClick={handleClose}>
              <Close fontSize='small' />
            </IconButton>
          </Typography>
          <Paper
            sx={{
              height: 'max-content',
              width: '100%',
              borderRadius: 0,
              borderBottomLeftRadius: 'inherit',
              borderBottomRightRadius: 'inherit',
              p: 2,
            }} elevation={0}>

            <MembersParams />

            <Divider sx={{ my: 2 }} />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' disableElevation size='large'
                onClick={() => {
                  handleClose();
                }}>
                start calculation
              </Button>
            </Box>



          </Paper>
        </Box>
      </Modal>

    </>
  )
}

// export default CalculatingPage;
const PopUpPart = () => {

  return (
    <>

    </>
  )
}
const theme = createTheme();
// console.log(theme);

function App() {
  // calculate();
  const asideRef = React.createRef();


  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>

        <BrowserRouter>
          {/* <Navigate
          to='/calculating'
        // replace={true}
        /> */}
          {/* <CalculatingPage /> */}
          <Routes >
            <Route exact path='/' element={<Navigate to='/calculating' />} />
            <Route path='/calculating' element={<CalculatingPage />} />
          </Routes>
          {/* <PopUpPart /> */}

        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
