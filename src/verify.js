import React,{Component} from 'react';
import {toast,say,closemodal} from './toast';
import Swal from 'sweetalert2';

export default class Verify extends Component{
	constructor(props){
		super();
		this.state = {
			verified:false,
			code:'',
			loading:true,
		}
	}
	componentDidMount(){
		say();
		window.setTimeout(()=>{
		say();
		toast("Verifying Email Address <i class='fa fa-spinner fa-spin'></i>");
		const verified =  this.props.match.params.verifycode;
		if(verified==undefined||verified==""){
			this.handlerror("Invalid Verification Code");
		}
		else {
			this.setState({verified:verified});
			this.sendcode(verified);
		}
	},5000);
		window.setInterval(()=>{
			if(this.state.loading){
			 document.getElementById("loader").style.display="block";
			}
			else {
				 document.getElementById("loader").style.display="none";
			}
			
			},1000);
	}

	sendcode(verified){
		const req = verified;
		// document.getElementById("loader").style.display="block";
		toast("Verifying Email Address <i class='fa fa-spinner fa-spin'></i>");
		fetch("https://novling.000webhostapp.com/budgetapp/verify.php",{
			method:"POST",
			body:req
		})
		.then(response=>response.json())
		.then((data)=>{
			closemodal();
			this.setState({loading:false});
			if(data.code==200){
				toast("Email Verification success");
				Swal.fire({
					icon:'success',
					text:data.token,
					showConfirmButton:false,
					showCloseButton:true,
					allowOutsideClick:false,
					timer:20000,
					allowEscapeKey:true,
				})
				.then((s)=>{
					this.props.history.push("/start");
				})
			}
			else if(data.code==203){
				this.handlerror(data.token,"Code Failed");
			}
			else {
				throw data.token;
			}
			//console.log(data);
		})
		.catch((err)=>{
			this.handlerror(err);
		})
	}
	done(username){
		Swal.fire({
				icon:'success',
				showConfirmButton:false,
				text:'Hi '+username+',you have been verified and you can now proceed to login',
				timer:20000,
				allowOutsideClick:false,
				showCloseButton:true,
				allowEscapeKey:true,
			})
			.then((move)=>{
				this.props.history.push("/start");
			})
	}
	handlerror(e,next){
		if(next==undefined){
			var show = true;
			var time = 20000;
		}
		else {
			var show = false;
			var time = '';
		}
		Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:e,
				timer:time,
				allowOutsideClick:false,
				allowEscapeKey:true,
				showCloseButton:show,
			})
			.then((move)=>{
				if(show){
				this.props.history.push("/start");
				}
			})
	}
	render(){
		return (
				<span>Verification Page</span>
			)
	}
}