import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => {
    return (
        <div>
            <h1>
                HATS PAGE
            </h1>
        </div>
    );
};

function App() {
    return (
        <div>
            <Switch>
                <Route exact path='/hats' component={HatsPage} />
                <Route component={HomePage} />
            </Switch>
        </div>
    );
}

export default App;
