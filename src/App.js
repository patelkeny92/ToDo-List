import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import AddTaskIcon from '@mui/icons-material/AddTask';
import './App.css';
import BasicTabs from './Components/BasicTabs/BasicTabs';

function App() {

  const [toDos, setToDos] = useState([])// need to ste array so that push funtion can work
  const [newTitle, setNewTitle] = useState('')


  useEffect(() => {
    let data = localStorage.getItem("data")
    if (data) {
      setToDos(JSON.parse(data))
    }
  }, [])

  //Handles the event when add btn is clicked
  const addHandler = () => {
    let newTodo = {  //making a new todo object
      id: Math.random(),
      title: newTitle,
      isCompleted: false,
      isDeleted: false
    }

    toDos.push(newTodo) //adding new object in state
    setToDos([...toDos]) // updating state

    localStorage.setItem("data", JSON.stringify(toDos)) // Updating Local Storage with state
  }

  //Handles The Event when complete btn is clicked
  const completeHandler = (id) => {

    const todo = toDos.find(e => e.id === id); // finds the element with id 
    todo.isCompleted = true // changes are made which are reflected automatically
    setToDos([...toDos]) //updating the current state
    localStorage.setItem("data", JSON.stringify(toDos)) //updating local storage with state
  }

  //Hanldes the event when clicked on delete btn
  const deleteHandler = (id) => {

    const todo = toDos.find(e => e.id === id);
    todo.isDeleted = true
    setToDos([...toDos])
    localStorage.setItem("data", JSON.stringify(toDos))
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  return (
    <div className="App">
      <div className='main-container'>
        <div className='container'>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{
              width: '90%'
            }}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '100%' },
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="standard-basic" label="Enter a new task" variant="standard" onChange={(data) => setNewTitle(data.target.value)} className="textInput" fullWidth="true"/>
                <Button variant="contained" size='small' startIcon={<AddTaskIcon />} onClick={addHandler} className="btn">
                  Add
                </Button>
              </Box>
              <Divider variant="middle" />
              <div className='card-list'>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ mt: 4, mb: 2, margin: '8px' }} variant="h6" component="div">
                    Task List
                  </Typography>
                  <BasicTabs toDos={toDos} complete={completeHandler} delete={deleteHandler}/>
                </Grid>
              </div>
            </Box>
          </ThemeProvider>
        </div>
      </div>
    </div >
  );
}

export default App;
