import React from "react";
import reactDom from "react-dom";
import { TodoCalendar } from "./component";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    WeekDayHeader: {
      backgroundColor: 'green',
    },
  });

function component() {
    const element = document.createElement('div');
    element.id = 'root';
  
    return element;
  }
  
  document.body.appendChild(component());
  
  const App = () =>{
      return <Box width={ '100%' } height={ '600px' } boxSizing={ 'border-box'}>
            <TodoCalendar 
                eventList={ [ { title: "Tarea 1", startDate: new Date() } ] }
                view = {{ type: 'month', month: 8, year: 2023 }}
                classes={ useStyles() }
            />
        
        </Box>
  }
  
  reactDom.render(<App />, document.getElementById("root"))
