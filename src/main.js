import React,{Component} from 'react';
import './css/main.css';
import Swal from 'sweetalert2';
import Budgets from './budgets';

export default class Main extends Component {
	constructor(props){
	super();
	this.state = {
		display:'none',
		reload:true,
		total:0,
		count:0,
		displaybudgets:'block',
		budgets:'',
		locked:true,
	}
		this.handleAdd = this.handleAdd.bind(this);
		this.handleSigned = this.handleSigned.bind(this);
	}

	componentDidMount(){

		// var total = 0;
		// if(localStorage.budgets!=undefined){
		// 	const budgets  = atob(localStorage.budgets);
		// 	var narr = budgets.split("~");
		// 	narr.forEach((budget,index)=>{
		// 		if(budget!=""){
		// 		const obj = budget.split("@");
		// 		let price = parseInt(obj[1]);
		// 		let quantity = parseInt(obj[2]);
		// 		var nt = parseInt(price*quantity);
		// 		//console.log(nt,total);
		// 		//console.log(total);

		// 		total =  parseInt(total)+parseInt(nt);
		// 		//console.log(typeof(nt),typeof(total))
		// 		//console.log(total)
		// 	}
		// 	})
		// 	this.setState({total:total});
		// }

		Swal.fire({
			timer:100,
			text:'Loading',
			showConfirmButton:false,
		});
		const budgetcount = localStorage.budgetcount;
		// console.log(budgetcount);
		// console.log(typeof(budgetcount));
		if(budgetcount==0||budgetcount=="0"||budgetcount==undefined){
			this.setState({"display":"block"})
			this.setState({"displaybudgets":"none"})
		}
		if(localStorage.getItem("budgetuserset")==undefined){
			this.props.history.push("/");
		}
		else {
			this.handleSigned();
	

	}
	//}
	// catch(err){
	// 	localStorage.removeItem("budgetuserset");
		
	// 	this.props.history.push("/");
	// }

	
	//	console.log(total);

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
	handleSigned(){
		//
	try{
	if(!this.state.locked){
			//console.log(this.state.locked);
		const budgetcount = localStorage.budgetcount;
		// console.log(budgetcount);
		// console.log(typeof(budgetcount));
		if(budgetcount==0||budgetcount=="0"){
			this.setState({"display":"block"})
			this.setState({"displaybudgets":"none"})
		}
		else {
			
			
			this.setState({budgetcount:budgetcount});
			const budgts  = atob(localStorage.budgets).split("~");
			this.setState({budgets:budgts})
		}

		}
		else {
			const date = new Date();
			const minutes = date.getMinutes();
			const hour = date.getHours();
			const time = hour+":"+minutes;
			var ask = true;
			if(localStorage.dur==undefined){
				ask = true;
				
			}
			else {
				var ago = (atob(localStorage.dur)).split(":");
				var houra = ago[0];
				var min = ago[1];

				//console.log(houra,hour)
				if(houra==hour){
					ask = false;
					// this.setState({locked:false});
					this.handleTotal();	
				}
				else {
					ask = true;
					//localStorage.setItem("dur",btoa(time));
				}
			}
			//console.log(ask);
			if(ask){
			const user =JSON.parse(atob(localStorage.budgetuser));
			console.log(user);
			//console.log(user)
			var {username,email} = user;
			
			//console.log(atob(u),atob(p));
			 username = atob(username);
			 email = atob(email);

			Swal.fire({
				backdrop:"#ffc107",
				icon:'question',
				title:'Welcome '+username,
				text:'Enter your password',
				//footer:'<span onClick={this.handleForget}>Forgotten Password</span>',
				input:'password',
				inputAttributes:{
					required:true,
					minlength:6,
					placeholder:'Password',
				},
				confirmButtonText:'Log In',
				validationMessage:'Enter a valid password more than 6 characters',
				// preconfirm:(password)=>{
				// 	//console.log(password);
				// 	return false;
				// },
			})
			.then((result)=>{
				if(result.value){
					const answer = btoa(result.value);
					this.loading();
					var jwt = localStorage.jwt;
					fetch("https://novling.000webhostapp.com/budgetapp/valid.php",{
						method:"POST",
						body:jwt+"*&~"+answer,
					})
					.then(response=>response.json())
					.then((data)=>{
						//console.log(data);
						if(data.code==200||data.code=="200"){
							localStorage.setItem("jwt",data.token);
								this.setState({locked:false});
							//	this.handleSigned();
								Swal.fire({
									timer:50,
									showConfirmButton:false,
									showCancelButton:false,

								})
								localStorage.setItem("dur",btoa(time));

								this.handleTotal();	
						}
						else if(data.code==400){
							Swal.fire({
							icon:'error',
							showConfirmButton:false,
							text:data.token,
							timer:2000,
						})
						.then((mov)=>{
							localStorage.removeItem("budgetuserset");
							this.props.history.push("/");
						})
						}
						else {
							this.handleSigned();
						Swal.showValidationMessage(
				       `Incorrect Password`
				         )
				       //  
						}
						//console.log(data);
					})
					.catch((err)=>{
						console.log(err);
					})
					// var password = answer;
					// if(answer===""){
					// }
					// else {
					// 
					// }
					//console.log(answer);
				}
				else {
					this.handleSigned();
				}
			})
		}
		
		}
		}
		catch(err){
			console.log(err);
		}
	//	this.handleTotal();
			
	}
	componentDidUpdate(){
		//this.handleTotal();
	}
	handleTotal(){
			const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 const req = email+"&^%"+jwt;
			fetch("https://novling.000webhostapp.com/budgetapp/total.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				//console.log(data);
				if(data.code==200){
					const total = data.token;
					this.setState({total:total});
					this.setState({"display":"none"})
				this.setState({"displaybudgets":"block"})
				
					//console.log(total,this.state.total);
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
			//	console.log(err);
			})
		
	}
	handleForget(){
		console.log('forogt ');
	}
	
	handleAdd(){
		this.props.history.push("/add");

	}
	render(){
		return (	
				<main>
					<span className="shownot" style={{"display":this.state.display}}>
						You've not added any item yet,Hit the ADD button to get started
					</span>
					<div className="allbudgets" style={{"display":this.state.displaybudgets}}>
						<Budgets />
						
						<div className='budget'  style={{"display":this.state.displaybudgets}}>
							<span className="itemname">
								Total
							</span>
							<span className='itemprice'>
								&#8358;{this.state.total}
							</span>
			</div>
					</div>
						<button className="btn-add" onClick={this.handleAdd}>
							<i className="fa fa-plus"></i>
						</button>

				</main>
		)
	}

}