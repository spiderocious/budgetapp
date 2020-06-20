import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Budgets extends Component {
state = {
  showdemo:'block',
}  
componentDidMount(){
  const userset = localStorage.getItem("budgetuserset");
  if(userset==undefined||userset==false){
    this.setState({showdemo:'block'});
  }
  else {
    this.setState({showdemo:'none'});
    this.props.history.push("/app");
  }
}
	render(){
		return (
	<React.Fragment>
	<section className="hero-wrap js-fullheight bg-warning" style={{"display":this.state.showdemo}}>
  		<div className="container">
  			<div className="row description js-fullheight align-items-center justify-content-center">
  				<div className="col-md-8 text-center">
  					<div className="text">
  						<h1>BudgetApp</h1>
  						<h4 className="mb-5">
  						It is imperative you keep a digital record of your shopping list,add new items,remove them and even share them......It's all fun and exciting
  						</h4>
  						<p><NavLink to="/start" className="btn btn-white px-4 py-3">
  						<i className="fa fa-hand-holding-usd"></i><i className="fa fa-money-bill-alt"></i>  Get Started 
              </NavLink></p>
  					</div>
  				</div>
  			</div>
  		</div>
  	</section>
  	</React.Fragment>
		)
	}
}