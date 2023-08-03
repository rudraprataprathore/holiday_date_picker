// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor }  from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactCalender from './Components/ReactCalender/ReactCalender'

const App = ({ basename }) => {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Router basename={basename}>
                <Switch>
                    <Route exact path="/calender" component={ReactCalender} />
                </Switch>
            </Router>
        </PersistGate>
    </Provider>
  );
};

export default App;

