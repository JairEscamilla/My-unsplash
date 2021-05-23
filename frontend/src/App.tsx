import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Feed } from './pages/Feeed/Feed';
import { Login } from './pages/Login/Login';
import { GlobalStyles } from './styles/globalStyles';


const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles theme={'light'} />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/feed" component={Feed} />
      </Switch>
    </BrowserRouter>    
  )
}

export default App;