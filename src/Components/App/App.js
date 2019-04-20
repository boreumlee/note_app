import React, { Component } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Notes from '../../Routes/Notes';
import Note from '../../Routes/Note';
import Add from '../../Routes/Add';
import Edit from '../../Routes/Edit';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={"/"} component={Notes}/>
          <Route path={"/Note/:id"} component={Note}/>
          <Route path={"/Add"} component={Add}/>
          <Route path={"/Edit/:id"} component={Edit}/>          
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
