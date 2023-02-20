import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';

const TodoList = (props) => {

  let id = props.id

  return (
    <div className='card-wrapper'>
      <List>
        <ListItem sx={{ margin: '0px', padding: '0px' }}>
          <ListItemIcon >
            <TaskAltIcon />
          </ListItemIcon>
          <ListItemText sx={{ width: '100%' }}
            primary={props.title}
            secondary={props.isCompleted ? 'Completed' : 'pending'}
          />
          <ListItem
            secondaryAction={
              props.isCompleted === false ? <IconButton edge="end" aria-label="Complete" onClick={() => props.complete(id)} > <DoneIcon size="small" /></IconButton> : <></>
            }
          ></ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => props.delete(id)}>
                <DeleteIcon />
              </IconButton>
            } sx={{
              width: '0%',
              padding: '25px'
            }}
          ></ListItem>
        </ListItem>
      </List>
      <Divider variant='inset' />
    </div>
  )
}

export default TodoList