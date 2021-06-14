import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { GlobalStyles } from './styles/globalStyles';
import { Feed } from './pages/Feeed/Feed';
import { globalStateType } from './App';
import { connect } from 'react-redux';

interface RoutesProps {
  authenticated: boolean;
}

const Routes = ({ authenticated }: RoutesProps) => {
  console.log(authenticated);
  
  return (
    <BrowserRouter>
      <GlobalStyles theme={'light'} />
      <Switch>
        <Route exact path="/" component={Login} />
        {authenticated ?
          <>
            <Route exact path="/feed" component={Feed} />
          </>
        : 
          <>
            
          </>
        }
      </Switch>
    </BrowserRouter>  
  )
}

const mapStateToProps = (state: globalStateType) => {
  const { authenticated } = state;
  return {
    authenticated
  }
}

export default connect(mapStateToProps)(Routes);