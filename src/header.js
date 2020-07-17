import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
	state= {
		loggedin:false,
		
	}
	render(){
		return (
			<nav className="navbar mynavbar fixed-top navbar-expand-lg navbar-light bg-warning">
						  <Link className="navbar-brand" to="/">BudGetApp</Link>
						  
						  <Link className="bell navbar-brand" id="bell" to="/notifications">
						  <i className='fa fa-bell'></i><sup></sup>
						  </Link>

						  <Link className="logout navbar-brand" id="more" to="/more">
						  <i className='fa fa-bars'></i>
						  </Link>
						  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
						    <span className="oi oi-menu"></span>
						  </button>

						 
						</nav>
		)
	}
}