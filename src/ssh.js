import React,{Component} from 'react';
import Swal from 'sweetalert2';
import {toast} from './toast';

class Details extends Component{
	constructor(props){
		super();
		this.state  = {
			code : '', 
			jwt : '',
			email:'',
			budgetid:'',
			budgetname:''
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
deleteBudget(){
		const code = this.props.match.params.code;
		const budgetid = this.props.match.params.budgetid;
		Swal.fire({
   		text:'Deleting '+this.state.budgetname,
   		footer:"<i class='fa fa-spinner fa-spin'></i>",	
   		showCancelButton:false,
   		allowOutsideClick:false,
   		showConfirmButton:false,
  	 	})
  	 	 //this.setState({email:email,jwt:jwt,code:code,budgetid:budgetid});
			 const req = this.state.email+"&^%"+this.state.jwt+"&^%"+this.state.code+"&^%"+this.state.budgetid;
			fetch("https://novling.000webhostapp.com/budgetapp/deletebudget.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				if(data.code==200){
					this.props.history.push("/shared/"+code);
					toast("Budget deleted successfully");
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
				this.props.history.push("/shared/"+code);
			})
			})
}
	componentDidMount(){
		if(localStorage.budgetuserset!="true"||localStorage.budgetuserset==undefined){
			this.props.history.push("/");
		}
		else {
		const code = this.props.match.params.code;
		const budgetid = this.props.match.params.budgetid;
		if(budgetid==undefined||code==undefined){
			this.props.history.push("/");
		}
		else {
			this.loading();
			const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 this.setState({email:email,jwt:jwt,code:code,budgetid:budgetid});
			 const req = email+"&^%"+jwt+"&^%"+code+"&^%"+budgetid;
			fetch("https://novling.000webhostapp.com/budgetapp/sharedet.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
			if(data.code==200){
			let name = data.budgetname;
			let price = data.budgetprice;
			let quantity = data.budgetquantity;
			let username = data.username;
			let isadmin = data.isadmin;
			this.setState({budgetname:name})
			Swal.fire({
				html:"Budget Name: "+name+"<br> Price : "+price+"<br> Quantity :"+quantity+"<br>Added by :"+username,
				confirmButtonText:'<i class="fa fa-arrow-left"></i> Back',
				showCancelButton:isadmin,
				cancelButtonText:"Delete Budget<i class='fa fa-trash'></i>",
				allowOutsideClick:true,
				showCloseButton:true,
				allowEscapeKey:true,
				confirmButtonColor:"#ffc107",
				customClass:{
					confirmButton:'btn-warning',
					cancelButton:'btn-danger',
				},
				backdrop:'#ffc107',
				background:'#fff',
			})
			.then((result)=>{

				if(result.value){
					this.loading();
						this.props.history.push("/shared/"+code);
					}
					else if(result.dismiss === Swal.DismissReason.cancel){
						Swal.fire({
							icon:'warning',
							text:'Do you really want to delete '+name,
							confirmButtonText:'YES,delete It!',
							cancelButtonText:"No,Keep it",
							showCloseButton:true,
							showCancelButton:true,

						})
						.then((shall)=>{
							if(shall.value){

								this.deleteBudget();
							}
							else {
								this.props.history.push("/shared/"+code);
							}
						})

					}
					else {
						this.props.history.push("/shared/"+code);
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
				this.props.history.push("/");
			})
			//	console.log(err);
			})
		
		}
	}
}
	render(){
		return (
				<span></span>
		)
	}
}
export default Details;