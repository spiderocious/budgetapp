import React,{Component} from 'react';
import Budget from './budget';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

export default class Budgets extends Component{
	state = {
		budgets : [],
		count :0,
		total:0,
	}
	componentDidMount(){
		try {
		//this.setState({budgets:"["});
		if(localStorage.getItem("budgetuserset")==undefined){
			this.props.history.push("/");
		}
		Swal.fire({
			html:"<i class='fa fa-spinner fa-spin'></i>",
			footer:"Loading Budgets",
			timer:4000,
		})
		const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 const req = email+"&^%"+jwt;
			fetch("https://novling.000webhostapp.com/budgetapp/budgets.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
			//	console.log(data);
				if(data.code==400||data.code==404||data.code==500){
					throw data.token;
				}
				else if(data.code==403){
					localStorage.removeItem("budgets");
					localStorage.removeItem("budgetuser");
					localStorage.removeItem("budgetcount");
					localStorage.removeItem("budgetuserset");
					localStorage.removeItem("dur");
					localStorage.removeItem("jwt");
					//*ooweryioo[09876542+////////////////////////////////////////////////////////////////////////////////////z]
				}
				else {
			//		console.log(data);
					this.setState({budgets:data});
				}
			})
			.catch((err)=>{
				Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:err,
				timer:2000,
			})
			.then((mov)=>{
				console.log(err);
				//window.location.href="/";
			})
			//	console.log(err);
			})
		//	this.setState({budgets:budgets})
			
	}
	catch(err){
		localStorage.removeItem("budgetuserset");
		//window.location.href="/";
		//this.props.history.push("/");
	}
	
	}
	
	render(){
		//console.log(this.state.budgets);
		return (
		<React.Fragment>{

		this.state.budgets.map((item)=>{
			if(item.budgetname==""||item==""){

			}
			else {
				//const obj = item.split("@");
				let name = item.budgetname;
				let price = parseInt(item.budgetprice);
				let quantity = parseInt(item.budgetquantity);
				let index = btoa(item.budgetindex);
				return <Budget itemid={index} budgetname={name} budgetprice={price} quantity={quantity}/>;
			}
				
			})
		 }
		</React.Fragment>
		)
	}
}