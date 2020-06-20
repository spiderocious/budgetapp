import React,{Component} from 'react';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
//import Budget from './budget';
import Share from './share';

export default class shared extends Component{
	constructor(props){
		super();
		this.state = {
			budgets:[],
			loading:'block',
		}
	}
	loading(){
	return	Swal.fire({
   		text:'loading',
   		footer:"<i class='fa fa-spinner fa-spin'></i>",	
   		showCancelButton:false,
   		//allowOutsideClick:false,
   		showConfirmButton:false,
   	})
   }
  
	componentDidMount(){
		//this.loading();
			if(localStorage.budgetuserset=="true"){
			const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 var req = email+"&^%"+jwt;
		
			fetch("https://novling.000webhostapp.com/budgetapp/shares.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				if(data.code==200){
					this.setState({loading:'none'});
					this.setState({budgets:data.budgets});
					console.log(this.state.budgets);
				}
				else {
					throw data.token;
				}
			})
			.catch((err)=>{
				Swal.fire({
				icon:'error',
				showConfirmButton:false,
				html:err,
				timer:2000,
			})
			.then((mov)=>{
				this.props.history.push("/");
			})
			})
		}
		else {

			this.props.history.push("/app");
		}
	}
	
	render(){
		return (
			<main className="sharemain">
			<div className="allbudgets shared" style={{"display":this.state.ownerscorner}}>
						<div className="budget" style={{"textAlign":"center"}}>
							<span className="itemname">
							Budget You've shared would be listed here 
							</span>
						</div>

						<div className="budget review" style={{"textAlign":"center"}}>
							<span className="itemname">Budget Code</span>
							<span className="itemname">Visits</span>
							<span className="itemname desktop">Date</span>
						</div>
						<div className="budget review" style={{"textAlign":"center","display":this.state.loading}}>
							<span className="itemname loading"><i className='fa fa-spinner fa-spin'></i></span>
							<span className="itemname loading"><i className='fa fa-spinner fa-spin'></i></span>
							<span className="itemname loading"><i className='fa fa-spinner fa-spin'></i></span>
						</div>
						
					<Share budgets={this.state.budgets}/>
				</div>
					<br/>
				</main>
		)
	}

}