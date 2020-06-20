import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './css/f2/css/all.css';
import Header from './header';
import {BrowserRouter as Router,Route,HashRouter} from 'react-router-dom';
import Budgets from './body';
import Start from './start';
import Main from './main';
//import Important from './important';
import Add from './add';
import Details from './details';
import Logout from './logout';
import More from './more';
import Shared from './shared';
import Shares from './shares';
import Sharedet from './sharedet';

class App extends Component  {


render(){

  return (
    <HashRouter>
    <Header />
    <Route exact path="/" component={Budgets}/>
    <Route path="/start" component={Start}/>
    <Route path="/shared/:code" component={Shared}/>
    <Route path="/app" component={Main}/>
    <Route path="/add" component={Add}/>
    <Route path="/more" component={More}/>
    <Route exact path="/shared" component={Shares}/>
    <Route path="/budget/:budgetid" component={Details}/>
    <Route path="/shares/:budgetcode" component={Sharedet}/>
    <Route path="/logout" component={Logout}/>
    </HashRouter>
  );
  }
}

export default App;
