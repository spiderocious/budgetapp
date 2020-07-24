import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
	constructor(props){
	super();
	this.state= {
		loggedin:false,
		page:'Budgets',
		showplus:"none",
		}
		this.handleNotify = this.handleNotify.bind(this);
		this.handleHome = this.handleHome.bind(this);
		this.shows = this.shows.bind(this);
		this.hides = this.hides.bind(this);
		this.handleProf = this.handleProf.bind(this);
	}

	componentDidMount(){
		 const userset = localStorage.getItem("budgetuserset");
					  if(userset===undefined||userset===false||localStorage.budgetuser===""||localStorage.budgetuser==undefined){
					  	localStorage.removeItem("budgets");
						localStorage.removeItem("budgetuser");
						localStorage.removeItem("budgetcount");
						localStorage.removeItem("budgetuserset");
						localStorage.removeItem("dur");
					    document.getElementById("more").style.display="none";
						document.getElementById("bell").style.display="none";
					  }
					  else {
					  	document.getElementById("more").style.display="block";
						document.getElementById("bell").style.display="block";
					  }
		const url = window.location.href;
		if(url.indexOf("app")>0){
			this.shows();
			this.decor("homebtn");
		}
		else if(url.indexOf("user")>0){
			this.decor("profbtn");
		}
		else if(url.indexOf("notifications")>0){
			this.decor("notebtn")
		}


	}
	handleNotify(){
		this.setState({page:"Notifications"});
		this.hides();
		this.decor("notebtn");
	}
	hides(){
		this.setState({showplus:"none"});
	}
	shows(){
		this.setState({showplus:"block"});
	}
	handleProf(){
		this.decor("profbtn");
	}
	handleHome(){
		this.shows();
		this.setState({page:"Budgets"});
		this.decor("homebtn");
	}
	decor(e){
	document.getElementById(e).style.color= "#d18";
    document.getElementById(e).style.borderTop = "2px solid #d18";
    var arr = ['homebtn','notebtn','profbtn'];
    var r = arr.indexOf(e);
    arr[r] = '';
    arr.forEach((item)=>{
    	if(item!=""){
    	document.getElementById(item).style.color= "#000";
    document.getElementById(item).style.borderTop = "transparent";	
}
    })
	}
	render(){
		return (
			<React.Fragment>

			<nav className="navbar mynavbar fixed-top navbar-expand-lg navbar-light bg-warning">
						  <Link className="navbar-brand" to="/">BudGetApp</Link>
						  
						  <Link className="bell" id="bell" to="/notifications">
						  <i className='fa fa-bell'></i><sup></sup>
						  </Link>

						  <Link className="logout navbar-brand" id="more" to="/more">
						  <i className='fa fa-bars'></i>
						  </Link>
						  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
						    <span className="oi oi-menu"></span>
						  </button>

			</nav>
			<section className="topnav" id="topnav">
				<span className="pagename" id="pagename">{this.state.page}</span>
				<Link to="/add"><i className="fa fa-plus" id="addsupbtn" style={{"display":this.state.showplus}}></i></Link>
			</section>
			<section className="navarea" id="navarea">
				<ul>
					<li onClick={this.handleHome} id="homebtn">
						<Link to="/app">
						<i className="fa fa-calculator"></i>
						<span>Budgets</span>
						</Link>
					</li>
					<li onClick={this.handleNotify} id="notebtn">
					<Link to="/notifications">
						 <i className='fa fa-bell'></i><sup id="supnote">3</sup>
						 <span>Notifications</span>
					</Link>
					</li>
					<li>
						<Link to="/more">
						<i className="fa fa-dot-circle"></i>
						<span>More</span>
						</Link>
					</li>

					<li id="profbtn" onClick={this.handleProf}>
						<Link to="/profile">
						<i className="fa fa-user"></i>
						<span>Profile</span>
						</Link>
					</li>
				</ul>
			</section>
			</React.Fragment>
		)
	}
}