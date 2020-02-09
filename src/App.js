import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Layout from '../src/components/Layout/Layout';
import Home from '../src/containers/Home/Home';
import Favorite from './containers/Favorites/Favorites';

const App = props => {
  return (
    <React.Fragment>
      <Layout>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/favorites" component={Favorite} />
        </Switch>
      </Layout>
    </React.Fragment>
  );
};

export default App;
