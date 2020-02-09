import React from 'react';
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/UI/Layout/Layout';
import Home from '../src/containers/Home/Home';
import Favorite from './containers/Favorites/Favorites';

const App = props => {
  return (
    <React.Fragment>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/favorites" component={Favorite} />
        </Switch>
      </Layout>
    </React.Fragment>
  );
};

export default App;
