import React,{Component} from 'react';
import Swal from 'sweetalert2';
import {say,closemodal} from './toast';
import {Link} from 'react-router-dom';

class Details extends Component{
	constructor(props){
		super();
		this.state  = {
			req:'',
			name:''
		}
		this.handleDelete = this.handleDelete.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}
	loading(e){
		if(e==undefined){
			e = 'Loading';
		}
	return	Swal.fire({
   		text:e,
   		footer:"<i class='fa fa-spinner fa-spin'></i>",	
   		showCancelButton:false,
   		allowOutsideClick:false,
   		showConfirmButton:false,
   	})
   
}
	componentDidMount(){
		var b = this.props.match.params.budgetid;
		if(b.indexOf("*")==0){
			const bn = b.split("*");
			var budgetid = bn[1];
		}
		else {
			var budgetid = atob(this.props.match.params.budgetid);
		}
		console.log(budgetid);
		//const budgets  = atob(localStorage.budgets);
		if(budgetid==undefined){
			this.props.history.push("/");
		}
		else {
			say();
				const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 const req = email+"&^%"+jwt+"&^%"+budgetid;
			 this.setState({req:req});
			fetch("https://novling.000webhostapp.com/budgetapp/details.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				//console.log(data);
				if(data.code==200){
			let name = data.budgetname;
			let price = data.budgetprice;
			let quantity = data.budgetquantity;
			this.setState({name:name,price:price,quantity:quantity});
			closemodal();
				}
				else {
					throw data.token;
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
				this.props.history.push("/");
			})
			//	console.log(err);
			})
		}
	}
handleDelete(){
		this.loading("Deleting...");
		var req = this.state.req;
		var name = this.state.name;
					//delete operation
				//console.log("delete");	
				fetch("https://novling.000webhostapp.com/budgetapp/delete.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
			//	console.log(data);
				if(data.code==200){
			var count = parseInt(localStorage.budgetcount);
			var ncount = count-1;
			//console.log(n);
			localStorage.setItem("budgetcount",ncount);
			
					Swal.fire({
				icon:'success',
				showConfirmButton:false,
				text:name+' has been deleted from budget successfully',
				timer:2000,
				allowOutsideClick:true,
				allowEscapeKey:true,
			})
			.then((move)=>{
				this.props.history.push("/app");
			})
				}
				else {
					throw data.token;
				}
			})
}
handleBack(){
	this.props.history.goBack();
}
	render(){
		return (
			<React.Fragment>
			<section className="topnav" id="topnav">
				<span className="pagename" id="pagename" onClick={this.handleBack}><i className='fa fa-arrow-left'></i> Details</span>
				
			</section>
				<main>
					<div className="allbudgets">
						<div className="budet">
							<div className="col-md-12">
								<span>Name</span>
								<h4>{this.state.name}</h4>
							</div>
							<div className="col-md-12 detarea">
							<div className="col-md-6 pricebord">
								<span>
									Quantity
								</span>
								<h4>{this.state.quantity}</h4>
							</div>
							<div className="col-md-6">
								<span>
									Price per unit 
								</span>
								<h4>{this.state.price}</h4>
							</div>
							</div>
						</div>
						
						<div className="budet">
						<div className="col-md-12 detarea">
						<div className="col-md-6">
							<span className="currency">N</span>{this.state.price*this.state.quantity}
						</div>
						<div className="col-md-6">
							<button className="deletebtn" onClick={this.handleDelete}><i className="fa fa-trash"></i></button>
						</div>

						</div>
						</div>
					</div>
				</main>
			</React.Fragment>
		)
	}
}
export default Details;