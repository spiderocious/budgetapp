import React,{Component} from 'react';
import './css/main.css';
import Swal from 'sweetalert2';
import Budgets from './budgets';
import './css/new.css';
import {Link} from 'react-router-dom';
import {toast,say,closemodal} from './toast';

export default class Main extends Component {
	constructor(props){
	super();
	this.state = {
		display:'none',
		reload:true,
		total:0,
		count:0,
		displaybudgets:'block',
		budgets:'',
		locked:true,
		password:'',
		displayload:"none",
		dis:"disabled",
		disps:"block",
		showbud:'none',
	}
		this.handleAdd = this.handleAdd.bind(this);
		this.handleSigned = this.handleSigned.bind(this);
	}

	componentDidMount(){
	try{
		 const userset = localStorage.getItem("budgetuserset");
					  if(userset===undefined||userset===false||localStorage.budgetuser===""||localStorage.budgetuser==undefined){
					    this.props.history.push("/");

					  }
	// 	// var total = 0;
	// 	// if(localStorage.budgets!=undefined){
	// 	// 	const budgets  = atob(localStorage.budgets);
	// 	// 	var narr = budgets.split("~");
	// 	// 	narr.forEach((budget,index)=>{
	// 	// 		if(budget!=""){
	// 	// 		const obj = budget.split("@");
	// 	// 		let price = parseInt(obj[1]);
	// 	// 		let quantity = parseInt(obj[2]);
	// 	// 		var nt = parseInt(price*quantity);
	// 	// 		//console.log(nt,total);
	// 	// 		//console.log(total);

	// 	// 		total =  parseInt(total)+parseInt(nt);
	// 	// 		//console.log(typeof(nt),typeof(total))
	// 	// 		//console.log(total)
	// 	// 	}
	// 	// 	})
	// 	// 	this.setState({total:total});
	// 	// }

	
		const budgetcount = localStorage.budgetcount;
		// console.log(budgetcount);
		// console.log(typeof(budgetcount));
		if(budgetcount===0||budgetcount==="0"||budgetcount===undefined){
			this.setState({"display":"block"})
			this.setState({"displaybudgets":"none"})
		}
		if(localStorage.getItem("budgetuserset")===undefined){
			this.props.history.push("/");
		}
		else {
			this.setState({displayload:"block"});
			this.handleSigned();
	

	}
	}
   catch(err){
   	console.log(err);
   }
	}
	loading(){
	return	Swal.fire({
   		text:'loading',
   		footer:"<i class='fa fa-spinner fa-spin'></i>",	
   		showCancelButton:false,
   		allowOutsideClick:false,
   		showConfirmButton:false,
   	})

}
	handleSigned(){
		//
	try{
	if(!this.state.locked){
		const budgetcount = localStorage.budgetcount;
		if(budgetcount===0||budgetcount==="0"){
			this.setState({"display":"block"})
			this.setState({"displaybudgets":"none"})
		}
		else {
			
			
			this.setState({budgetcount:budgetcount});
		}

		}
		else {
			const date = new Date();
			const minutes = date.getMinutes();
			const hour = date.getHours();
			const time = hour+":"+minutes;
			var ask = true;
			if(localStorage.dur===undefined){
				ask = true;
				
			}
			else {
				var ago = (atob(localStorage.dur)).split(":");
				var houra = ago[0];
				var min = ago[1];

				//console.log(houra,hour)
				if(houra===hour){
					ask = false;
					// this.setState({locked:false});
					this.handleTotal();	
				}
				else {
					ask = true;
					//localStorage.setItem("dur",btoa(time));
				}
			}
			//console.log(ask);
			if(!ask){
					this.setState({disps:"none"});
					this.setState({showbud:"block"});
		}
		
		}
		}
		catch(err){
			console.log(err);
		}
	//	this.handleTotal();
			
	}

	handleTotal(){
	
	}
	handleForget(){
		console.log('forogt ');
	}
	
	handleAdd(){
		this.props.history.push("/add");

	}

	handleKeys(e){
		const password = e.target.value;
		if(password.length>5){
			this.setState({dis:""});
		}
		else {
			this.setState({dis:"disabled"});
		}
	}
	handlePass(e){
		e.preventDefault();
		const password = document.getElementById("password").value;
		if(password.length>5){
					const date = new Date();
					const minutes = date.getMinutes();
					const hour = date.getHours();
					const time = hour+":"+minutes;
					 const userset = localStorage.getItem("budgetuserset");
					  if(userset===undefined||userset===false||localStorage.budgetuser===""||localStorage.budgetuser==undefined){
					    this.props.history.push("/");

					  }
					const user =JSON.parse(atob(localStorage.budgetuser));
					var {username,email} = user;
					 username = atob(username);
					 email = atob(email);

					const answer = btoa(password);
					document.getElementById("submitbtn").innerHTML="<i class='fa fa-spinner fa-spin'></i>";
					//this.loading();
					var jwt = localStorage.jwt;
					fetch("https://novling.000webhostapp.com/budgetapp/valid.php",{
						method:"POST",
						body:jwt+"*&~"+answer,
					})
					.then(response=>response.json())
					.then((data)=>{
						//console.log(data);
						if(data.code===200||data.code==="200"){
							localStorage.setItem("jwt",data.token);
								say();
								this.setState({locked:false});
							//	this.handleSigned();
								this.setState({disps:"none"});
								localStorage.setItem("dur",btoa(time));

								this.handleTotal();	
								closemodal();
								this.setState({showbud:"block"});
								this.setState({displayload:"none"});
						}
						else if(data.code===400){
							Swal.fire({
							icon:'error',
							showConfirmButton:false,
							text:data.token,
							timer:2000,
						})
						.then((mov)=>{
							localStorage.removeItem("budgetuserset");
							this.props.history.push("/");
						})
						}
						else {
							this.handleSigned();
						toast("Incorrect Password");
						document.getElementById("submitbtn").innerHTML='<i class="fa fa-arrow-right"></i>';
				       //  
						}
						//console.log(data);
					})
					.catch((err)=>{
						console.log(err);
					})
		}
		else {
			toast("Password must be 6 characters or more");
		}
	}
	render(){
		return (	
			<React.Fragment>

			<div className="formdiv row" style={{"display":this.state.disps}}>
			<header className="formhead">
				<img src="logo.png" height="50" width="50"/>
				
			</header>
				<div className="container">
					<div className="col-md-12">
						<div className="col-md-6">
							<img src="sign.png"/>
						</div>
						<div className="col-md-6 form">
							<form onSubmit={this.handlePass.bind(this)}>
								<span className="desc">Log In to your account</span>
								<label htmlFor="password">Password</label>
								<input type="password" id="password" className="inputs" placeholder="*********"/>
								<button type="submit" className="btn btn-warning" id="submitbtn"> <i className="fa fa-arrow-right"></i> </button>
							</form>
					</div>
					</div>
				</div>
				
			</div>
				<main style={{"display":this.state.showbud}}>
					
					<span className="shownot" style={{"display":this.state.display}}>
						You've not added any item yet,Hit the ADD button to get started
					</span>
					<div className="allbudgets">
						<Budgets />
						
						
					</div>
						<button className="btn-add" onClick={this.handleAdd}>
							<i className="fa fa-plus"></i>
						</button>

				</main>
				</React.Fragment>
		)
	}

}
