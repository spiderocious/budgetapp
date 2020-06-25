import React,{Component} from 'react';
import Swal from 'sweetalert2';

export default class Start extends Component{

state={
	user:'',
	username:'',
	userpassword:'',


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
login(pass,email,username){
	this.loading();
	//console.log(password);
	var password = btoa(pass);
	const toback = atob(email)+":;"+atob(username)+":;"+password;
   	fetch("budgetapp/save.php",{
   		method:"POST",
   		body:toback,

   	})
   	.then(response=>response.json())
   	.then((data)=>{
   		let code = data.code;
   		if(code==200){
   		//	console.log(data.token);
   		const user = JSON.stringify({"username":username,"email":email});
   		localStorage.setItem("budgetuserset",true);
 	  	localStorage.setItem("budgetcount",0);
 	  	localStorage.setItem("jwt",data.token);
  	 	localStorage.setItem("budgetuser",btoa(user));
   		if(localStorage.lastcode==undefined||localStorage.lastcode==""){
            this.props.history.push("/app");
          }
          else {
              const code  = localStorage.lastcode;
              var link = "shared/"+code;
              this.props.history.push(link);
          }
   		}
   		else if(code==500){
   			console.log("backend error");
   		}
   		else if(code==404){
   			throw "Please fill all empty form fields";
   		}
   		else {
   			throw "Error occured,Please try again";
   		}
   	})
   	.catch((err)=>{
   		Swal.fire({
		icon:'error',
		text:err,
		showConfirmButton:false,
		allowOutsideClick:true,
		showCloseButton:true,
	})
	.then((data)=>{
		this.props.history.push("/");
	})
   	})
  
}

componentDidMount(){
	//console.log("jeez");
	try{
	Swal.mixin({
  input: 'text',
  confirmButtonText: 'Next &rarr;',
  showCancelButton: true,
  progressSteps: ['i', 'ii', 'iii'],
  allowOutsideClick:false,
	allowEscapeKey:false,
	allowEnterKey:true,
	inputAttributes:{
		required:true,

	},
	validationMessage:'What\'up,Please Fill the form to continue',
	showCancelButton:true,

	cancelButtonText:'Back',
	
	customClass:{
		confirmButton:'bg-warning',
		cancelButton:'bg-dark',
	},
}).queue([
  {	
  	input:'email',
  	inputAttributes:{
  		minlength:8,
  	},
  	validationMessage:'Enter a valid Email address',
    title: 'Enter your email address',
    text: 'Trust Us,we won\'t spam you,just personal mails only',
  },
  {	
  	inputAttributes:{
  		minlength:3,
  	},
  	validationMessage:'Username must be more than 3 characters',
  	title:'Choose a Username',
  	text:'Hey,Choose a befiting name we can call you',
	},
  
]).then((result) => {
	//console.log(result.value,result.dismiss);
var password;
  if (result.value) {
    const answers = result.value;
   	const username =  btoa(answers[1]);
   	const email = btoa(answers[0]);
   	this.loading();
   	fetch("budgetapp/signup.php",{
   		method:'POST',
   		body:answers[0],
   	})
   	.then(response=>response.text())
   	.then((data)=>{
  // 	console.log(data);
   		const isregistered = data.trim();
  		if(isregistered=="404"||isregistered==404){
  			//console.log('new ser');
  	(async () => {
    await  Swal.fire({
  	confirmButtonText: 'Sign Up',
 	 showCancelButton: false,
 // progressSteps: ['i', 'ii', 'iii'],
 	 allowOutsideClick:false,
	allowEscapeKey:false,
	allowEnterKey:true,
	inputAttributes:{
		required:true,  
		minlength:6,
	},
	//validationMessage:'What\'up,Please Fill the form to continue',
	showCancelButton:true,
	cancelButtonText:'Back',
	customClass:{
		confirmButton:'bg-warning',
		cancelButton:'bg-dark',
	},
  	validationMessage:'Password length must be more than 6 characters',
  	title:'Choose a Password',
  	text:'Hi,Choose a strong six characters,alphanumeric password you\'ll use to open budgetapp',
	input:'password',
	
  			})
  	.then((res)=>{
  		var pass = res.value;
  		password = pass;
  		this.login(password,email,username);
  	})
  	 


    // all of the script.... 

})();	}
  		else if(isregistered=="200"||isregistered==200){
  			//console.log("ask for password");
  			Swal.fire({
  	confirmButtonText: 'Log In',
 	 showCancelButton: false,
 // progressSteps: ['i', 'ii', 'iii'],
 	 allowOutsideClick:false,
	allowEscapeKey:false,
	allowEnterKey:true,
	inputAttributes:{
		required:true,
		minlength:6,
	},
	//validationMessage:'What\'up,Please Fill the form to continue',
	showCancelButton:false,
	cancelButtonText:'Back',
	customClass:{
		confirmButton:'bg-warning',
		cancelButton:'bg-dark',
	},
  	validationMessage:'Password length must be more than 6 characters',
  	title:'Choose a Password',
  	text:'Hi,Choose a strong six characters,alphanumeric password you\'ll use to open budgetapp',
	input:'password',
	
  			})
  	.then((res)=>{
  			//this feature is being tested
  			let pass = btoa(res.value);
  			this.loading();
   			//console.log("old user"+pass);
   			let nd = answers[0]+"&^%"+pass;
   			fetch("/budgetapp/login.php",{
   				method:"POST",
   				body:nd,
   			})
   			.then(response=>response.json())
   			.then((data)=>{
   				console.log(data);
   				if(data.code==200){
   					const user = JSON.stringify({"username":username,"email":email});
			   		localStorage.setItem("budgetuserset",true);
			 	  	localStorage.setItem("budgetcount",0);
			 	  	localStorage.setItem("jwt",data.token);
			  	 	localStorage.setItem("budgetuser",btoa(user));
            if(localStorage.lastcode==undefined||localStorage.lastcode==""){
			   		this.props.history.push("/app");
          }
          else {
              const code  = localStorage.lastcode;
              var link = "shared/"+code;
              this.props.history.push(link);
          }
			   				}
   				else if(data.code==403){
   						this.props.history.push("/");
   						Swal.showValidationMessage(
				       `Incorrect Password`
				         )
   				}
   				else if(data.code==500){
   						this.props.history.push("/");
   						Swal.showValidationMessage(
				       `Incorrect Password`
				         )
   				}
   				else {
   					this.props.history.push("/");
   				}
   			})
  		  	})
  		}
  		else{
  			this.props.history.push("/");
  		//	console.log("no condiions");
  		}
   	})
   	.catch((err)=>{
   		Swal.fire({
		icon:'error',
		text:'Error '+err+' occured',
	})
	.then((data)=>{
		this.props.history.push("/");
	})	
   	})
   	//{
 //  	
	// }
   	//const password = 123456789;
  this.loading(); 	
  }
  else {
  	this.props.history.push("/");
  }
})

}
catch(err){
	Swal.fire({
		icon:'error',
		text:'Error '+err+' occured',
	})
	.then((data)=>{
		this.props.history.push("/");
	})
}
	
	// Swal.fire({
	// text:'Hey',
	// allowOutsideClick:false,
	// allowEscapeKey:false,
	// allowEnterKey:true,
	// showCancelButton:true,
	// cancelButtonText:'Back',
	// confirmButtonText:'Sign Up',
	// customClass:{
	// 	confirmButton:'bg-warning',
	// 	cancelButton:'bg-dark',
	// }
	// })
}
	render(){
		return (
				<span className="fa fa-user"></span>
			)
		
	}
}