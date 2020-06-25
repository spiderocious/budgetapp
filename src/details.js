import React,{Component} from 'react';
import Swal from 'sweetalert2';
class Details extends Component{

	loading(){
	return	Swal.fire({
   		text:'loading',
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
			this.loading();
				const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 const req = email+"&^%"+jwt+"&^%"+budgetid;
			fetch("budgetapp/details.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				console.log(data);
				if(data.code==200){
			let name = data.budgetname;
			let price = data.budgetprice;
			let quantity = data.budgetquantity;
			Swal.fire({
				html:"Item: "+name+"<br> Price : &#8358;"+price+"<br> Quantity: "+quantity,
				confirmButtonText:'Delete',
				showCancelButton:false,
				allowOutsideClick:true,
				showCloseButton:true,
				confirmButtonColor:'red',
				customClass:{
					confirmButton:'btn-danger',
				},
				backdrop:'rgba(0,0,0,0.4)',
			})
			.then((result)=>{

				if(result.value){
					this.loading();
					//delete operation
				//console.log("delete");	
				fetch("backend/budgetapp/delete.php",{
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
				else {
					this.props.history.push("/app");
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

	render(){
		return (
				<span></span>
		)
	}
}
export default Details;