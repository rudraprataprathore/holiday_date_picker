// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactCalender from './Components/ReactCalender/ReactCalender'

const App = () => {
  return (
    <Router>
        <Switch>
            <Route exact path="/calender" component={ReactCalender} />
        </Switch>
    </Router>
  );
};

export default App;

