import React,{Component} from 'react';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

export default class More extends Component{
	constructor(props){
		super();	
	this.state = {
		edit:0,
	}
	this.handleShare = this.handleShare.bind(this);
	this.handleExist = this.handleExist.bind(this);
	this.handleNew = this.handleNew.bind(this);
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
	handleShare(e){
		e.preventDefault();
		//console.log("shareclicked");
		Swal.fire({
			icon:'question',
			text:'Do you want to create new budget list or share your existing budget list',
			confirmButtonText:'Create New Budget',
			cancelButtonText:'Share existing Budget',
			showCancelButton:true,
			allowOutsideClick:true,
			showCloseButton:true,
			allowEnterKey:true,
			allowEscapeKey:true,
			customClass:{
				confirmButton:'bg-warning',
			}
		})
		.then((result)=>{
			if(result.value){
				//console.log("new");
				Swal.fire({
    					icon:'question',
    					showCancelButton:true,
    					text:'Do you want other users to add or delete this budget',
			confirmButtonText:'Allow',
			cancelButtonText:'No',
			allowOutsideClick:true,
			showCloseButton:true,
			allowEnterKey:true,
			footer:'Permission to other Users',
			allowEscapeKey:true,
			customClass:{
				confirmButton:'bg-warning',
			}
    				})
    				.then((allow)=>{
    					if(allow.value){
    						this.setState({edit:1});
    					}
    					else {
    						this.setState({edit:0});
    					}
    			console.log(this.state.edit);
				this.handleNew();
    				})

			}
			else if(result.dismiss === Swal.DismissReason.cancel){
				//	console.log("existing");
				Swal.fire({
    					icon:'question',
    					showCancelButton:true,
    					text:'Do you want other users to add or delete this budget',
			confirmButtonText:'Allow',
			cancelButtonText:'No',
			allowOutsideClick:true,
			showCloseButton:true,

			allowEnterKey:true,
			footer:'Permission to other Users',
			allowEscapeKey:true,
			customClass:{
				confirmButton:'bg-warning',
			}
    				})
    				.then((allow)=>{
    					if(allow.value){
    						this.setState({edit:1});
    						this.handleExist();
    					}
    					else if(result.dismiss === Swal.DismissReason.cancel){
				 
    						this.setState({edit:0});
							this.handleExist();
    					}
    					else {

    					}
    				})
    			//console.log(this.state.edit);

    			
			}
			else {

			}
		})
	}

	handleNew(){
		this.loading();
		const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 const req = email+"&^%"+jwt+"&^%"+this.state.edit;
			fetch("https://novling.000webhostapp.com/budgetapp/sharenew.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				console.log(data);
				if(data.code==200){
					Swal.fire({
						icon:'success',
						html:"Your Budget sharing code is <br/><u>"+data.token+"</u> and the sharing link is <a target='_blank' href='http://192.168.43.70:3000/shared/"+data.token+"' class='text-yellow'>Budget Link</a> ",
						footer:'Budget Code:'+data.token,
						confirmButtonText:'Open Budget',
						showCancelButton:true,
						cancelButtonText:'Close',
						invertButtons:true,
						allowEscapeKey:true,
						allowOutsideClick:false,
						showCloseButton:true,
						customClass:{
							confirmButton:'bg-warning',

						}
					})
					.then((result)=>{
						if(result.value){
						const link = "shared/"+data.token;
						this.props.history.push(link);
					}
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
				console.log(err);
				this.props.history.push("/app");
			})
			})
	
	}

	handleExist(){
		this.loading();
		const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 const req = email+"&^%"+jwt+"&^%"+this.state.edit;
			fetch("https://novling.000webhostapp.com/budgetapp/sharexist.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				console.log(data);
				if(data.code==200){
					Swal.fire({
						icon:'success',
						html:"Your Budget sharing code is <br/><u>"+data.token+"</u> and the sharing link is <a target='_blank' href='http://192.168.43.70:3000/shared/"+data.token+"' class='text-yellow'>Budget Link</a> ",
						footer:'Budget Code:'+data.token,
						confirmButtonText:'Share <i class="fa fa-share"></i>',
						showCancelButton:true,
						cancelButtonText:'Close',
						invertButtons:true,
						allowEscapeKey:true,
						allowOutsideClick:false,
						showCloseButton:true,
						customClass:{
							confirmButton:'bg-warning',

						}
					})
					.then((result)=>{
						if(result.value){
							
							if(navigator.share){
						   navigator.share({
						      title: username+' shared a budget with you on BudgetApp. Budget Code is'+data.token,
						      url: "http://192.168.43.70:3000/shared/"+data.token,
						    }).then(() => {
						      throw 'Thanks for sharing!';
						    })
						    .catch((err)=>{
						    	
						    });
							
							}
							}
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
				console.log(err);
				this.props.history.push("/app");
			})
			})
	}
	componentDidMount(){
	if(localStorage.budgetuserset=="true"&&localStorage.jwt!=undefined&&localStorage.budgetuser!=undefined&&localStorage.budgetuser!=''&&localStorage.jwt!=''){

			}
			else {
				this.props.history.push("/app");
			}
	}
	render(){
			return (
				<main>
				<div className="allbudgets">
				<Link to="/shared">
						<div className="budget" style={{"textAlign":"center"}}>
							<span className="itemname"><i className="fa fa-user"></i><i className="fa fa-share"></i> Shared Budgets</span>
						</div>
					</Link>
					
				<a onClick={this.handleShare}>
						<div className="budget" style={{"textAlign":"center"}}>
							<span className="itemname"><i className="fa fa-share"></i> Share your budget</span>
						</div>
				</a>
					
				<Link to="/budget/Nw==">
						<div className="budget" style={{"textAlign":"center"}}>
							<span className="itemname"><i className="fa fa-user"></i> Customer Care/Support</span>
						</div>
				</Link>
					
					<Link to="/logout">
						<div className="budget" style={{"textAlign":"center"}}>
							<span className="itemname"><i className="fa fa-power-off"></i> Log Out</span>
						</div>
					</Link>
					
						<div className="budget" style={{"textAlign":"center"}}>
							<span className="itemname"><i className="fa fa-copyright"></i>2020 <a href="https://twitter.com/swipeinc"> Swipe </a></span>
						</div>
					
					
				</div>
				</main>
				)
	}
}