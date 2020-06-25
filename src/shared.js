import React,{Component} from 'react';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import Budget from './budget';

export default class shared extends Component{
	constructor(props){
		super();
		this.state= {
			code : '',
			btnadd:"none",
			link:'',
			ownerscorner:'none',
			newuser:0,
			admin:0,
			budgets:[],
			review:[],
			loading:"block",
			dispload:"table-row",
			nolist:"none",
			msg:'',
			username:'',
			email:'',
			token:'',
			req:'',
			total:'',
			editaccess:0,
			time:4000,
		}
		this.startload = this.startload.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
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
   handleAdd(){
   	 //console.log("add new to this budget");
   	 if(this.state.editaccess==1){
   	 		const code = this.state.code;
   	 		const username = this.state.username;
   	 		if(username.trim()==""||this.state.email==""||localStorage.jwt==""||localStorage.jwt==undefined){
   	 			//a new user that needs to sign in
   	 			Swal.fire({
   	 				text:'You need to log in to make changes to this budget',
   	 				confirmButtonText:'Log In/Sign Up',
   	 				cancelButtonText:'Cancel',
   	 				customClass:{
   	 					confirmButton:'btn btn-warning',
   	 					cancelButton:'btn btn-danger',
   	 				},
   	 				allowOutsideClick:true,
   	 				allowEscapeKey:true,
   	 			})
   	 			.then((response)=>{
   	 				if(response.value){
   	 						//signup or login
   	 						localStorage.setItem("lastcode",this.state.code);
   	 						this.props.history.push("/start");
   	 				} 
   	 				else {
   	 					this.toast("You cannot add new items to this budget without signing in.")
   	 				}


   	 			})
   	 		}
   	 		else {
   	 			//old user
   	 			this.handleBudget();
   	 		}
   	 }
   	 else {
   	 	this.props.history.push("/");
   	 }
   }
   toast(e){
   		document.getElementById("toast").style.display="block";
   		document.getElementById("toastext").innerHTML=e;
   		document.getElementById("toast").style.opacity=0.4;
   		window.setTimeout(()=>{
   			document.getElementById("toast").style.opacity=0.7;
   			window.setTimeout(()=>{
   				document.getElementById("toast").style.opacity=1;
   			},500)
   		},500)
   		window.setTimeout(()=>{
   			document.getElementById("toast").style.opacity=0;
   			document.getElementById("toast").style.display="none";
   		},10000)
   }
   handleBudget(){
   	Swal.mixin({
	icon:'question',
	  input: 'text',
	  icon:'question',
	  backdrop:'#ffc107',
	  confirmButtonText: 'Next &rarr;',
	  showCancelButton: true,
	  progressSteps: ['i', 'ii', 'iii'],
	  allowOutsideClick:true,
		allowEscapeKey:true,
		allowEnterKey:true,
		inputAttributes:{
			required:true,
		},
		validationMessage:'What\'up,Enter Item Name',
		showCancelButton:true,

		cancelButtonText:'Cancel',
		
		customClass:{
			confirmButton:'bg-warning',
			cancelButton:'bg-dark',
		},
	}).queue([
	  {	
	  	input:'text',
	  	inputAttributes:{
	  		minlength:3,
	  		placeholder:'Item Name',
	  		required:true,
	  	},
	  	validationMessage:'Enter a item name',
	    // title: 'Enter your email address',
	    text: 'Enter Item name',
	    footer:'Name of the item you want to add to your budget',
	  },
	  {	
	  	inputAttributes:{
	  		minlength:0,
	  		min:0,
	  		required:true,
	  		placeholder:'Item Price',
	  	minimum:1,
	  	},
	  	input:'number',
	  	validationMessage:'Item Price must be more than 0 and must not be empty',
	  	text:'Enter item price',
	  	footer:'Price at which the item is sold per unit(1)',
		},
	  {
	  	inputAttributes:{
	  		minlength:1,
	  		min:0,
	  		minimum:1,
	  		max:1000,
	  		required:true,
	  		placeholder:'Item Quantity',
	  		value:1,
	  	},
	  	input:'number',
	  	validationMessage:'Item Quantity must be more than  0',
	  	// title:'Choose a Password',
	  	text:'Item quantity?',
	  	footer:'Quantity or Number of the item you wish to buy',
		confirmButtonText:'Add Item',
	}
	]).then((result)=>{
		if(result.value){
			var arr = result.value;
			if(arr.length<3){
				Swal.fire({
					timer:2000,
					text:'Empty Item Credentials',
					showConfirmButton:false,
				})
				
			}
			else {

			const name = arr[0];
			const price = arr[1] ;
			const quantity = arr[2];
			 if(price==0||price=="0"){
						throw "Price must be greater than zero(0)";
			}
			else if(quantity==0||quantity=="0"){
				throw 'Quantity must be more than zero(0)';
			}
			var arr =  [name,price,quantity];
			arr.forEach((item,index)=>{
				try {
					if(item.indexOf("@")>-1){
						throw "Invalid Item details";
					}
					else if(item.indexOf("~")>-1){
						throw "Invalid Item details";
					}
					else if(price==0||price=="0"){
						throw "Price must be greater than zero(0)"
					}
				}
				catch(err){
					Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:err,
				timer:2000,
			})
			
				}
			})
			var jwt = localStorage.jwt;
			const obj =  name+"&^%"+price+"&^%"+quantity+"&^%"+this.state.req;
			//console.log(obj);
			this.loading();
			fetch("budgetapp/addbudgets.php",{
				method:"POST",
				body:obj,	
			})
			.then(response=>response.json())
			.then((data)=>{
				//console.log(data);
				if(data.type==1){
					var ans = name+' has been added to budget successfully';
				}
				else {
					var ans = name+' has been added to budget successfully,Your budget will be reviewed by the budget admin and would be added to the main list';
				}
				if(data.code==200){
					Swal.fire({
				icon:'success',
				showConfirmButton:false,
			text:ans,
				timer:2000,
				allowOutsideClick:true,
				allowEscapeKey:true,
			}).then((result)=>{
				this.startload();
			})
				this.toast(ans);
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
			
				});
			
			}

		}
		else {
			Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:'Please,Fill all empty text boxes',
				timer:2000,
			})
		}
	})	
	.catch((err)=>{
		Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:err,
				timer:2000,
		})
		//console.log(err);
		//this.props.history.push("/");
	})
   }
	componentDidMount(){
		this.loading();
		this.startload();
		
	}
	startload(){
		const code = this.props.match.params.code;
		const link = code;
		
		this.setState({code:code,link:link});
		//fetch budget details 
		if(localStorage.budgetuserset=="true"){
		const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 this.setState({username:username,email,email,token:jwt})
			 var req = email+"&^%"+jwt+"&^%"+code;
			}
			else {
				var req = "0"+"&^%"+"0"+"&^%"+code;
				this.setState({newuser:1});
			}
			fetch("budgetapp/shared.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				//console.log(data);
				if(data.code==200){
					const owner = data.isowner;
					const username = data.username;
					const editaccess = data.editaccess;
					const budgetname = data.budgetname;
					if(editaccess==1||owner==1){
						this.setState({btnadd:'block'});
						this.setState({editaccess:1});
					}
					else {
						this.setState({btnadd:'none'});
						this.setState({editaccess:0});
					}
					if(owner==1){
						this.setState({ownerscorner:'block'});
						this.setState({admin:1});
						this.fetchadbud(true);
						this.fetchbud();
					}
					else {
							this.setState({ownerscorner:'none'});
							this.setState({admin:0});
							this.fetchadbud()
					}
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
				this.props.history.push("/");
			})
			})
	}
	fetchbud(admin){
		//fetch shared budgets 
		try{
		this.setState({dispload:"table-row"});
		if(this.state.admin==1){
			const user =JSON.parse(atob(localStorage.budgetuser));
		
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 var req = email+"&^%"+jwt+"&^%"+this.state.code;
			
			//var a = localStorage.jwt;
		fetch("budgetapp/budgetreview.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				this.setState({dispload:"none"});
				//console.log(data);
				if(data.code==200){
					console.log(data.budgets);
					this.setState({review:data.budgets});
					this.subscribe(true);
				}
				else if(data.code==203){
					this.setState({nolist:"block",msg:data.token});
					this.subscribe(true);
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
				this.props.history.push("/");
			})

			})
		}
	}
		catch(err){
			Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:err,
				timer:2000,
			})
			.then((mov)=>{
				this.props.history.push("/");
			})			
		}
}
		subscribe(type){
		}
	review(e){
		document.getElementById(e).innerHTML="<i class='fa fa-spinner fa-spin'></i> Adding";
		const req = this.state.req+"&^%"+e;
		document.getElementById(e).disabled=true;
		fetch("budgetapp/addtolist.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				if(data.code==200){
					this.toast(data.token);
					var ide = e+"id";
					document.getElementById(ide).style.display="none";
					this.fetchbud();
					this.fetchadbud();

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
				this.props.history.push("/");
			})	

			})
		
	}
	fetchadbud(admin){
		//fetch shared budgets 
		this.setState({loading:"block"});
		if(admin){
			const user =JSON.parse(atob(localStorage.budgetuser));
		
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 var req = email+"&^%"+jwt+"&^%"+this.state.code;
			
			//var a = localStorage.jwt;
		}
		else if(localStorage.budgetuserset=="true"){
			const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 var req = email+"&^%"+jwt+"&^%"+this.state.code;
		}
		else {
			var req = 0+"&^%"+0+"&^%"+this.state.code;
		}
		this.setState({req:req});
		fetch("budgetapp/budgetshared.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				this.setState({loading:"none"})
			if(data.code==200){
				const budgets = data.budgets;
				this.setState({budgets:budgets});
				Swal.fire({
					text:'',
					showConfirmButton:false,
					timer:10,
				})
				window.setTimeout(()=>{
					var t = 0;
					var rr = document.getElementsByClassName("total");
					for(var i=0;i<rr.length;i++){
					  var price = rr[i].outerText;
					  t = t +  parseInt((price).trim());
					}
					this.setState({total:t});

				},2000);
			}
			else if(data.code==203){
			//	throw data.token;
				Swal.fire({
				showConfirmButton:false,
				text:data.token,
				timer:2000,
			})

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
				this.props.history.push("/");
			})

			})
	}	
	render(){
		return (
			<main>
			<nav>
				<div className="com">
					<div className="col-md-6 budget bbtn using">
					<i className="fa fa-calculator"></i>
					</div>

					<div className="col-md-6 bbtn icon">
						<i className="fa fa-comment"></i>
					</div>
				</div>
			</nav>
			<div className="allbudgets">
			<div className="budget col-md-8  text-center">
							Church Building Donation Pledges
						</div>
						{
							this.state.budgets.map((budget,index)=>{
								if(budget.budgetprice!=""){
								return <Budget budgetid={budget.budgetid} code={this.state.code} budgetname={budget.budgetname} budgetprice={budget.budgetprice} quantity={budget.budgetquantity}/>;
								}
							})
						}
						<div className="budget" style={{"display":this.state.loading}}>
							<span className="itemname"><i className="fa fa-spinner fa-spin"></i></span>
							<span className="itemprice"><i className="fa fa-spinner fa-spin"></i></span>
						</div>
						<div className="budget">
							<span className="itemname">Total</span>
							<span className="itemprice">&#8358;{this.state.total}</span>
						</div>

						<div className="budget" style={{"textAlign":"center"}}>
	<span className="itemname"><i className="fa fa-link"></i> Link : <Link to={this.state.link}>http://localhost:3000/shared/{this.state.code}</Link> </span>
						</div>
						<div className="budget" style={{"textAlign":"center"}}>
							<span className="itemname"><i className="fa fa-code"></i> Code : {this.state.code} </span>
						</div>
				
				</div>
				<br/>
				<div className="allbudgets" style={{"display":this.state.ownerscorner}}>
						<div className="budget" style={{"textAlign":"center"}}>
							<span className="itemname">Budget Reviews <small>You are to review and add each budget to the main list because you created the budget</small> 
							</span>
						</div>
						<table className="reviewtb">
						<thead>
							<tr>
							<td><span className="itemname">Name</span></td>
							<td><span className="itemname">Price</span></td>
							<td><span className="itemname">Quantity</span></td>
							<td><span className="itemname">Added By</span></td>
							<td><span className="itemname">Action</span></td>
							</tr>
						</thead>
						<tbody>
							<tr style={{"display":this.state.nolist}}>
									<td><span className="itemprice">{this.state.msg}</span></td>
							</tr>
							<tr style={{"display":this.state.dispload}}>
								<td><span className="itemname"><i className="fa fa-spinner fa-spin"></i></span></td>
								<td><span className="itemname"><i className="fa fa-spinner fa-spin"></i></span></td>
								<td><span className="itemname"><i className="fa fa-spinner fa-spin"></i></span></td>
								<td><span className="itemname"><i className="fa fa-spinner fa-spin"></i></span></td>
								<td><span className="itemname"><i className="fa fa-spinner fa-spin"></i></span></td>
							</tr>
							{
								this.state.review.map((budget)=>{
									if(budget.budgetprice!=""){
										var ide = budget.budgetid+"id";
									return <tr key={budget.budgetid} id={ide}>
											<td><span className="itemname">{budget.budgetname}</span></td>
											<td><span className="itemname">{budget.budgetprice}</span></td>
											<td><span className="itemname">{budget.budgetquantity}</span></td>
											<td><span className="itemname">{budget.username}</span></td>
											<td>
											<button className="btn" onClick={this.review.bind(this,budget.budgetid)} id={budget.budgetid}>
												<span className="itemname">Add Budget</span>
											</button>
											</td>
											</tr>
										}
								})
							}
						</tbody>
						</table>
				</div>
				
			
			
				<button className="btn-add"  style={{"display":this.state.btnadd}} onClick={this.handleAdd}><i className="fa fa-plus"></i></button>
			</main>
		)
	}

}