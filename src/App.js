//React
import React, { useState } from 'react';
import './App.css';

//Material UI
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, TextField, Button } from '@material-ui/core'

//Footer
import Contact from './Contact'

const App = () => {

  const [OptionsState, setOptionsState] = useState(["Yes 👍", "No 👎"])
  const [NewOptionState, setNewOptionState] = useState("")
  const [SelectedState, setSelectedState] = useState(null)

  const optionChangeHandler = event => {
    setNewOptionState(event.target.value)
  }

  const onAddHandler = () => {
    const options = [...OptionsState]
    if (NewOptionState === "" || options.includes(NewOptionState.trim()))
      return null
    else {
      options.push(NewOptionState)
      setOptionsState(options)
      setNewOptionState("")
      setSelectedState(null)
    }
  }

  const onTouchHandler = option => {
    const options = [...OptionsState]

    setOptionsState(options.filter(opt => opt !== option))
    setSelectedState(null)
  }

  const onPickHandler = () => {
    const opts = [...OptionsState]
    for (let i = opts.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }

    setSelectedState(opts[0])
  }

  return (
    <Container maxWidth={"xl"} className="Body" disableGutters="true">

      <Box className="Content">
        <Typography variant="h2" align="center">I Do Know</Typography>

        <Box display="flex" justifyContent="space-evenly" margin="5%">
          <TextField label="New Option" variant="outlined" value={NewOptionState} onChange={optionChangeHandler}
            onKeyPress={(event) => {
              return event.key === "Enter" ? onAddHandler() : null
            }} />
        </Box>

        <Box component={Paper}>
          {OptionsState.length === 0 ? null
            : <List aria-label="options">
              {OptionsState.map(option =>
                <ListItem button key={option} onClick={() => onTouchHandler(option)}>
                  <ListItemText primary={option} />
                </ListItem>
              )}
            </List>}
        </Box>

        {SelectedState === null ? null
          : <Box className="PickContent">
            <Typography variant="h5"><b>Your Pick:</b> {SelectedState}</Typography>
          </Box>}

        <Box className="PickButton">
          {OptionsState.length < 2 ? null
            : <Button variant="outlined" onClick={onPickHandler}>Pick</Button>}
        </Box>

      </Box>

      <Contact />

    </Container>
  );
}

export default App;
