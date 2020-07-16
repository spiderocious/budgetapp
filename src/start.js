import React,{Component} from 'react';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {toast,say,closemodal} from './toast';

export default class Start extends Component{

state={
	user:'',
	username:'',
	userpassword:'',
  disps:"block",
  sign:true,
  info:'',
  second:'',
  infos:'x'
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
  this.shout("Signing Up");
  say();
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
      closemodal();
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
// try{
// 	Swal.mixin({
//   input: 'text',
//   confirmButtonText: 'Next &rarr;',
//   showCancelButton: true,
//   progressSteps: ['i', 'ii', 'iii'],
//   allowOutsideClick:false,
// 	allowEscapeKey:false,
// 	allowEnterKey:true,
// 	inputAttributes:{
// 		required:true,

// 	},
// 	validationMessage:'What\'up,Please Fill the form to continue',
// 	showCancelButton:true,

// 	cancelButtonText:'Back',
	
// 	customClass:{
// 		confirmButton:'bg-warning',
// 		cancelButton:'bg-dark',
// 	},,
// }).queue([
//   {	
//   	input:'email',
//   	inputAttributes:{
//   		minlength:8,
//   	},
//   	validationMessage:'Enter a valid Email address',
//     title: 'Enter your email address',
//     text: 'Trust Us,we won\'t spam you,just personal mails only',
//   },
//   {	
//   	inputAttributes:{
//   		minlength:3,
//   	},
//   	validationMessage:'Username must be more than 3 characters',
//   	title:'Choose a Username',
//   	text:'Hey,Choose a befiting name we can call you',
// 	},
  
// ]).then((result) => {
// 	//console.log(result.value,result.dismiss);
// var password;
//   if (result.value) {
//     const answers = result.value;
//    	const username =  btoa(answers[1]);
//    	const email = btoa(answers[0]);
//    	this.loading();
//    	fetch("budgetapp/signup.php",{
//    		method:'POST',
//    		body:answers[0],
//    	})
//    	.then(response=>response.text())
//    	.then((data)=>{
//   // 	console.log(data);
//    		const isregistered = data.trim();
//   		if(isregistered=="404"||isregistered==404){
//   			//console.log('new ser');
//   	(async () => {
//     await  Swal.fire({
//   	confirmButtonText: 'Sign Up',
//  	 showCancelButton: false,
//  // progressSteps: ['i', 'ii', 'iii'],
//  	 allowOutsideClick:false,
// 	allowEscapeKey:false,
// 	allowEnterKey:true,
// 	inputAttributes:{
// 		required:true,  
// 		minlength:6,
// 	},
// 	//validationMessage:'What\'up,Please Fill the form to continue',
// 	showCancelButton:true,
// 	cancelButtonText:'Back',
// 	customClass:{
// 		confirmButton:'bg-warning',
// 		cancelButton:'bg-dark',
// 	},
//   	validationMessage:'Password length must be more than 6 characters',
//   	title:'Choose a Password',
//   	text:'Hi,Choose a strong six characters,alphanumeric password you\'ll use to open budgetapp',
// 	input:'password',
	
//   			})
//   	.then((res)=>{
//   		var pass = res.value;
//   		password = pass;
//   		this.login(password,email,username);
//   	})
  	 


//     // all of the script.... 

// })();	}
//   		else if(isregistered=="200"||isregistered==200){
//   			//console.log("ask for password");
//   			Swal.fire({
//   	confirmButtonText: 'Log In',
//  	 showCancelButton: false,
//  // progressSteps: ['i', 'ii', 'iii'],
//  	 allowOutsideClick:false,
// 	allowEscapeKey:false,
// 	allowEnterKey:true,
// 	inputAttributes:{
// 		required:true,
// 		minlength:6,
// 	},
// 	//validationMessage:'What\'up,Please Fill the form to continue',
// 	showCancelButton:false,
// 	cancelButtonText:'Back',
// 	customClass:{
// 		confirmButton:'bg-warning',
// 		cancelButton:'bg-dark',
// 	},
//   	validationMessage:'Password length must be more than 6 characters',
//   	title:'Choose a Password',
//   	text:'Hi,Choose a strong six characters,alphanumeric password you\'ll use to open budgetapp',
// 	input:'password',
	
//   			})
//   	.then((res)=>{
//   			//this feature is being tested
//   			let pass = btoa(res.value);
//   			this.loading();
//    			//console.log("old user"+pass);
  
  		  //	})
//   		}
//   		else{
//   			this.props.history.push("/");
//   		//	console.log("no condiions");
//   		}
//    	})
//    	.catch((err)=>{
//    		Swal.fire({
// 		icon:'error',
// 		text:'Error '+err+' occured',
// 	})
// 	.then((data)=>{
// 		this.props.history.push("/");
// 	})	
//    	})
//    	//{
//  //  	
// 	// }
//    	//const password = 123456789;
//   this.loading(); 	
//   }
//   else {
//   	this.props.history.push("/");
//   }
// })

// }
// catch(err){
// 	Swal.fire({
// 		icon:'error',
// 		text:'Error '+err+' occured',
// 	})
// 	.then((data)=>{
// 		this.props.history.push("/");
// 	})
// }
	
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

handleSignUp(e){
  this.setState({info:'',infos:''});
  if(e!=undefined){
  e.preventDefault();
  }
  //console.log("signed up");
      if(this.state.second===true){
      document.getElementById("newstuffs").innerHTML="";
       document.getElementById("loginbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
      }
      else if(this.state.second===false){
       document.getElementById("newstuff").innerHTML="";
        document.getElementById("signupbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
      }
      
  if(this.state.sign===true){
      document.getElementById("login").style.display="none";
      document.getElementById("signup").style.display="block";
  }
  else {
      document.getElementById("signup").style.display="none";
      document.getElementById("login").style.display="block";
  }
      this.setState({sign:!this.state.sign});
      this.setState({second:''});
}

talk(e){
  this.setState({info:e,infos:e});
  toast(e);
  this.shout(e);

}
shout(e){
  if(this.state.sign===true){
       document.getElementById("infos").innerHTML=e;
  }
  else {
        document.getElementById("info").innerHTML=e;
  }

}
handleSubmit(e){
  this.setState({info:''});
  e.preventDefault();
  var mom = this.state.sign;
    if(mom===true){
      var email = document.getElementById("emailogin").value;
       document.getElementById("loginbtn").innerHTML="<i class='fa fa-spinner fa-spin'></i>";
    }
    else {
      var email = document.getElementById("emailsignup").value;
       document.getElementById("submitbtn").innerHTML="<i class='fa fa-spinner fa-spin'></i>";
    }
    if(email.trim()===""){
      this.talk("Empty Email Address");
    }
    else {
    this.checkup(email);
    }


}

handlePost(){
 
}
handleGet(e){
  return document.getElementById(e).value;
}
handleUsername(username,nusername,nemail,password){
  this.shout("Verifying Username");
  if(username.trim()===""){
     throw "Empty Username";
  }
  else {

    const req = username;
    fetch("budgetapp/username.php",{
      method:"POST",
      body:req,
    })
    .then(response=>response.json())
    .then((data)=>{
     // console.log(data);
   if(data.code!=404){
      var answer = data.code;
      console.log(answer);
          if(answer==200){
             this.talk("Username Verified,Signing up");
             this.login(password,nemail,nusername);
          }
          else if(answer==203){
              this.shout("Username already exist,Enter another one");
               document.getElementById("submitbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
          }
          else {
            throw "Error Occured,Please refresh the page and try again";
          }
        
   }
   else {
    throw data.token;
   }
    })
    .catch((err)=>{
       this.talk(err);
        document.getElementById("submitbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
    })
  }
}
handleSignUpPost(){
    this.shout("Verifying Email Address");
  var password = this.handleGet("signuppassword");
  var email = this.handleGet("emailsignup");
  var username = this.handleGet("username");
  var arr = [email,password,username];
   var nuser = btoa(username);
        var nemail = btoa(email);
  try{
   if(email.indexOf("@")<0||email.indexOf(".")<0){
      throw "Invalid Email Address";
    }
    var spls = email.split(".");
     var last = spls[spls.length-1];
     var io = email.split("@");
     var ends = io[io.length-1];
  arr.forEach((entry,index)=>{
    if(entry.trim()===""){
        var names = ["Email Address","Password","Username"];
        let name = names[index];
        throw name+" field empty";
    }
    else if(password.length<6){
      throw "Password characters must be more than 5";
    }
  
    else if(last.length<2){
      throw "Invalid Email Address";
    }
    else if(ends.length<4){
      throw 'Invalid Email Address';
    }
    else if(username.length<3){
      throw 'Username must be more than 3 characters';
    }
    else {
       
    
       
    }
  })
      this.handleUsername(username,nuser,nemail,password);
}
catch(err){
    this.talk(err);
     document.getElementById("submitbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
}
}
checkup(email){

    fetch("budgetapp/signup.php",{
       method:'POST',
       body:email,
     })
     .then(response=>response.text())
     .then((data)=>{
      var res = data.trim();
       this.proceed(res,email);
        })
     .catch((err)=>{
         this.setState({second:''});
       console.log(err);
       this.handleSignUp();
       // document.getElementById("submitbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
     })
   }
proceed(res,email){
 if(this.state.second===""){

       if(res===200||res==="200"){
        if(!this.state.sign){
          document.getElementById("submitbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
          this.handleSignUp();
          this.talk("Account already exist,Please Login");
          document.getElementById("loginbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
        }
          else {
          var psu = `<div id="newstuffs">
                    <label htmlFor="password">Password</label>
                     <input type="password" id="loginpassword" name="password" class="inputs" placeholder="Choose a password(6 characters long)" required minlength="6"/>
                      </div>`;

          const already = document.getElementById("logininputs").innerHTML;
          document.getElementById("logininputs").innerHTML=already+psu;
           document.getElementById("loginbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
           document.getElementById("emailogin").value=email; 
           this.setState({second:true});
        }
       
       }
       else if(res===404||res==="404"){
        if(this.state.sign){
          document.getElementById("loginbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
          this.handleSignUp();
          this.talk("Account does not exist,Please signup");
          document.getElementById("submitbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
        }
        else {
          var psu = `<div id="newstuff">
                    <label htmlFor="username">Username</label>
                     <input type="text" name="username" id="username" class="inputs" placeholder="Choose a Username" required minlength="3"/>
                    <label htmlFor="password">Password</label>
                     <input type="password" id="signuppassword" name="password" class="inputs" placeholder="Choose a password(6 characters long)" required minlength="6"/>
                     </div>`;
          const already = document.getElementById("signupinputs").innerHTML;
          document.getElementById("signupinputs").innerHTML=already+psu;
            document.getElementById("submitbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
            this.setState({second:false});
          document.getElementById("emailsignup").value=email;
        }
       }
       else {
        this.talk(res);
       }
    
   }
   else if(this.state.second===true&&res==200){
      console.log("login")
     //..parameters needed for login 
      this.loginme();
      this.shout("Verifying Email Address");
   }
   else if(this.state.second==false&&res==404){
     this.handleSignUpPost();
   }
   else if(res==200){
      this.setState({second:''});
       this.handleSignUp();
        this.talk("Account already exist,Please Login");
        document.getElementById("submitbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
   }
   else {
    this.talk("An Unknown error Occured,Refresh the page to continue");
   }
}
sendlogin(email,password){
  say();
  this.talk("sending");
          let nd = email+"&^%"+btoa(password);
        fetch("/budgetapp/login.php",{
          method:"POST",
          body:nd,
        })
        .then(response=>response.json())
        .then((data)=>{
          closemodal();
          console.log(data);
        //  this.talk(data);
          if(data.code==200){
            const user = JSON.stringify({"username":btoa(data.username),"email":btoa(email)});
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
             this.talk(
               `Incorrect Password`
                 )
             document.getElementById("loginbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
          }
          else if(data.code==500){
              this.talk(
               `Incorrect Password`
                 )
              document.getElementById("loginbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
          }
          else {
            this.props.history.push("/");
          }
        })
        .catch((err)=>{
          this.talk("Error Occured,Refresh this page to continue");
            console.log(err);
        })
      
}
  loginme(){
    const email = this.handleGet("emailogin");
    const password = this.handleGet("loginpassword");
    if(email==""||password==''){
      this.shout("Empty Form Fields,Please fill the empty forms");
      document.getElementById("loginbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
    }
    else {
        var arr = [email,password];
  try{
   if(email.indexOf("@")<0||email.indexOf(".")<0){
      throw "Invalid Email Address";
    }
    var spls = email.split(".");
     var last = spls[spls.length-1];
     var io = email.split("@");
     var ends = io[io.length-1];
  arr.forEach((entry,index)=>{
    if(entry.trim()===""){
        var names = ["Email Address","Password","Username"];
        let name = names[index];
        throw name+" field empty";
    }
    else if(password.length<6){
      throw "Password characters must be more than 5";
    }
  
    else if(last.length<2){
      throw "Invalid Email Address";
    }
    else if(ends.length<4){
      throw 'Invalid Email Address';
    }
   
    else {
       this.shout("Credentials valid,Logging In");
     
       
    }
  })
  this.sendlogin(email,password);
    }
    catch(err){
      this.talk(err);
       document.getElementById("loginbtn").innerHTML="<i class='fa fa-arrow-right'></i>";
    }
  }
}

	render(){
		return (
			<React.Fragment>
}

<span className="shownot" style={{"display":this.state.displayload}}>
            Loading  Budgets <i className="fa fa-spinner fa-spin"></i>
          </span>      <div className="formdiv row" style={{"display":this.state.disps}}>
      <header className="formhead">
        <Link to="/"><img src="logo.png" height="50" width="50"/></Link>
        <a href="#" className="flink" onClick={this.handleSignUp.bind(this)}>Sign Up</a>
      </header>
        <div className="container">
          <div className="col-md-12">
            <div className="col-md-6">
              <img src="sign.png"/>
            </div>
            <div className="col-md-6 form" id="login">
              <form onSubmit={this.handleSubmit.bind(this)} id="loginform">
                <span className="desc">Log In to your account</span>
                <div id="logininputs">
                 <label id="infos">{this.state.info}</label>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="emailogin" className="inputs" placeholder="username@domain.com"/>
                  </div>
                
                    <button type="submit" className="btn btn-warning" id="loginbtn">
                      <i className='fa fa-arrow-right'></i>
                    </button>
                <label>Don't have an account?
                   <a href="#" className="flink" onClick={this.handleSignUp.bind(this)} style={{"float":"inherit !important"}}>
                     Sign Up
                   </a>
                </label>
              </form>
             
          </div>
          <div className="col-md-6 form" id="signup">
            
              <form onSubmit={this.handleSubmit.bind(this)} id="signupform">
                <span className="desc">Sign up into budgetapp</span>
                <div id="signupinputs">
                <label id="info">{this.state.infos}</label>
               <label htmlFor="email">Email Address</label>
                  <input type="email" name="email" id="emailsignup" className="inputs" placeholder="username@domain.com"/>
                  </div>
                   <button type="submit" className="btn btn-warning" id="submitbtn">
                       <i className='fa fa-arrow-right'></i>
                    </button>
                <label>Already have an account? 
                  <a href="#" className="flink" onClick={this.handleSignUp.bind(this)} style={{"float":"inherit !important"}}>
                    Sign In
                  </a> 
                </label>
              </form>
          </div>
          </div>
        </div>
        
      </div>
    </React.Fragment>
			)
		
	}
}