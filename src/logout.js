import React,{Component} from 'react';
import Swal from 'sweetalert2';

export default class Logout extends Component{
	componentDidMount(){
		//console.log(localStorage.budgetuserset)
	if(localStorage.budgetuserset==="true"){
		Swal.fire({
		icon:'warning',
		text:'Hi,When you logout,you\'ll lose all your budgets list.Did you still want to log out?',
		confirmButtonText:'Yes',
		showCancelButton:'No',
		showCloseButton:true,
		allowOutsideClick:true,
		allowEscapeKey:true,
		timer:5000,
		backdrop:'#d18',
		})
		.then((result)=>{
			if(result.value){
				
						this.logout();
					
			}
			else {
				this.props.history.push("/app");
			}
		})
		}
		else {
			this.props.history.push("/start");
		}
	}
	logout(){	
		document.getElementById("more").style.display="none";
		document.getElementById("bell").style.display="none";
		try{
		localStorage.removeItem("budgets");
		localStorage.removeItem("budgetuser");
		localStorage.removeItem("budgetcount");
		localStorage.removeItem("budgetuserset");
		localStorage.removeItem("dur");
		Swal.fire({
		timer:2000,
		text:'Logged Out Successfully',
		showConfirmButton:false,
		icon:'success',
		})
		.then((done)=>{
			this.props.history.push("/");
		})
		}
		catch(err){
			Swal.fire({
				icon:'error',
				text:'Error Occured while logging you out',
				showConfirmButton:false,

			})
			.then((e)=>{
			this.props.history.push("/app");
			})
		}
	}
	render(){
		return (
		<span></span>
		)
	}
}