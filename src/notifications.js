import React,{Component} from 'react';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

export default class Notifications extends Component{
	state = {
		notifications:[],
	}
		componentDidMount(){
		try {
		if(localStorage.getItem("budgetuserset")==undefined){
			this.props.history.push("/");
		}
		else {
		Swal.fire({
			html:"<i class='fa fa-spinner fa-spin'></i>",
			footer:"Loading Notifications",
			showConfirmButton:false,
			showCancelButton:false,
			allowOutsideClick:false,

		})
		const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 const req = email+"&^%"+jwt;
			fetch("https://novling.000webhostapp.com/budgetapp/notifications.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
			
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
				}
				else {
					if(data.code==200){
						const notifications = data.notifications;
						this.setState({notifications:notifications});
						Swal.fire({
							showConfirmButton:false,
							background:"transparent",
							backdrop:"transparent",
							timer:200
						})
					}
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
			
			})
			})
			}
	}
	catch(err){
		localStorage.removeItem("budgetuserset");
	}
	
	}
	render(){
		return (
			<main>
			<div className="allbudgets">

				<div className="budget col-md-8 text-center">Notifications</div>
				{
					this.state.notifications.map((note)=>{
						if(note.notification!=""){
						if(note.type==0){
							
							var b = "#";
						}
						else {
							
							var b = "/shared/"+note.code;
						}
						return <Link to={b}>
							<div key={note.index} className="budget" style={{"textAlign":"center"}}>
								<span className="itemname">{note.notification}</span>
							</div>
							</Link>
						}
					})
				}
				<div className="budget" style={{"textAlign":"center"}}>
					<span className="itemname">Debayo sent you an invite for team-budget</span>
				</div>

				<div className="budget" style={{"textAlign":"center"}}>
					<span className="itemname">Your budget (jollof rice) was accepted by team-picnic-budget</span>
				</div>
				
				</div>
			
			</main>
		)
	}
}