import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TodoList from '../TodoList/TodoList';

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toDos = props.toDos
  
  return (
    <Box sx={{ width: '100%', margin: "0px", padding: '0px', overflow: 'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Panding" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ width: '100%', margin: "0px", height: '25rem', padding: '0px', overflow: 'auto' }}>
          {
            toDos?.map((e) => {
              return (
                <div>
                  {!e.isDeleted &&
                    <TodoList key={e.id} title={e.title} id={e.id} complete={props.complete} isCompleted={e.isCompleted} delete={props.delete} className="todo" />}
                </div>
              )
            })
          }
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ width: '100%', margin: "0px", height: '25rem', padding: '0px', overflow: 'auto' }}>
          {
            toDos?.map((e) => {
              if (!e.isCompleted) { //checking if the element is completed or not 
                return (
                  <div>
                    {!e.isDeleted &&
                      <TodoList key={e.id} title={e.title} id={e.id} complete={props.complete} isCompleted={e.isCompleted} delete={props.delete} className="todo" />}
                  </div>
                )
              } else {
                return <></>
              }
            })
          }
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ width: '100%', margin: "0px", height: '25rem', padding: '0px', overflow: 'auto' }}>
          {
            toDos?.map((e) => {
              if (e.isCompleted) {
                return (!e.isDeleted && <TodoList key={e.id} id={e.id} title={e.title} isCompleted={e.isCompleted} delete={props.delete} />)
              } else {
                return <></>
              }
            })
          }
        </Box>
      </TabPanel>
    </Box>
  );
}