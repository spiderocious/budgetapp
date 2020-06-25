import React,{Component} from 'react';
import Swal from 'sweetalert2';
class Details extends Component{
	constructor(props){
		super();
		this.state  = {
			code : '', 
			jwt : '',
			email:'',
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
handleRevoke(){
		Swal.fire({
				   		text:'Revoking Link',
				   		footer:"<i class='fa fa-spinner fa-spin'></i>",	
				   		showCancelButton:false,
				   		allowOutsideClick:false,
				   		showConfirmButton:false,
		})
		const code = this.state.code;
		const jwt = this.state.jwt;
		const email = this.state.email;
		 const req = email+"&^%"+jwt+"&^%"+code;
			fetch("budgetapp/revoke.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				if(data.code==200){
			Swal.fire({
				icon:'success',
				text:data.token,
				showConfirmButton:false,
				
				timer:2000,
			})
			.then((mov)=>{
				this.props.history.push("/shared");
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
				//console.log(err);
				this.props.history.push("/shared");
			})
			})
}
	componentDidMount(){
		if(localStorage.budgetuserset!="true"){
			this.props.history.push("/");
		}
		var code;
		const budgetid = this.props.match.params.budgetcode;
		console.log(budgetid);
		//console.log(budgetid);
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
			 this.setState({email:email,jwt:jwt,code:budgetid});
			 const req = email+"&^%"+jwt+"&^%"+budgetid;
			fetch("budgetapp/sharedetails.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
			//	console.log(data);
			if(data.code==200){
			let name = data.budgetcode;
			let price = data.budgetvisits;
			let quantity = data.budgetdate;
			code = name;
			Swal.fire({
				html:"Code: "+name+"<br> Visits : "+price+"<br> Created on "+quantity,
				confirmButtonText:'Go to budget',
				showCancelButton:true,
				cancelButtonText:"Revoke Link <i class='fa fa-trash'></i>",
				allowOutsideClick:true,
				showCloseButton:true,
				confirmButtonColor:'green',
				cancelButtonColor:'red',
				customClass:{
					confirmButton:'btn-warning',
					cancelButton:'btn-danger',
				},
				backdrop:'rgba(0,0,0,0.4)',
			})
			.then((result)=>{

				if(result.value){
					this.loading();
						this.props.history.push("/shared/"+code);
					}
					else if(result.dismiss === Swal.DismissReason.cancel){
					//revoke link 
						const swalWithBootstrapButtons = Swal.mixin({
						  customClass: {
						    confirmButton: 'btn btn-warning',
						    cancelButton: 'btn btn-danger'
						  },
						 // buttonsStyling: false
						})

						swalWithBootstrapButtons.fire({
						  title: 'Are you sure?',
						  text: "You won't be able to revert this!",
						  icon: 'warning',
						  showCancelButton: true,
						  confirmButtonText: 'Yes, delete it!',
						  cancelButtonText: 'No, cancel!',
						  reverseButtons: true
						}).then((result) => {
						  if (result.value) {
						   this.handleRevoke();
						  } else{
						   		this.props.history.push("/shared");
						  }

						})

						

						//sends fetch request to link revoke 
					}
					else {
						this.props.history.push("/shared")
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