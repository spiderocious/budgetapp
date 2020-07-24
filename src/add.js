import React,{Component} from 'react';
import Swal from 'sweetalert2';
import {toast} from './toast';

export default class Add extends Component{
	
	constructor(props){
		super();
	this.state = {
		budgetname:'',
		budgetprice:'',
		budgetquantity:'',
		price:0,
		quantity:1,
		name:'',
	}
	this.handleBack = this.handleBack.bind(this);
	this.handleSave = this.handleSave.bind(this);
	this.handleName = this.handleName.bind(this);
	this.handlePrice = this.handlePrice.bind(this);
	this.handleQuan = this.handleQuan.bind(this);
}
loading(e){
	if(e==undefined){
		e = 'Loading...';
	}
	return	Swal.fire({
   		text:e,
   		footer:"<i class='fa fa-spinner fa-spin'></i>",	
   		showCancelButton:false,
   		allowOutsideClick:false,
   		showConfirmButton:false,
   	})
   
}


handleBefore(){
	Swal.mixin({
			icon:'question',
	  input: 'text',
	  icon:'question',
	  backdrop:'#ffc107',
	  confirmButtonText: 'Next &rarr;',
	  showCancelButton: true,
	  progressSteps: ['i', 'ii', 'iii'],
	  allowOutsideClick:true,
		allowEscapeKey:true,
		allowEnterKey:true,
		inputAttributes:{
			required:true,
		},
		validationMessage:'What\'up,Enter Item Name',
		showCancelButton:true,

		cancelButtonText:'Cancel',
		
		customClass:{
			confirmButton:'bg-warning',
			cancelButton:'bg-dark',
		},
	}).queue([
	  {	
	  	input:'text',
	  	inputAttributes:{
	  		minlength:3,
	  		placeholder:'Item Name',
	  		required:true,
	  	},
	  	validationMessage:'Enter a item name',
	    // title: 'Enter your email address',
	    text: 'Enter Item name',
	    footer:'Name of the item you want to add to your budget',
	  },
	  {	
	  	inputAttributes:{
	  		minlength:0,
	  		min:0,
	  		required:true,
	  		placeholder:'Item Price',
	  	},
	  	input:'number',
	  	validationMessage:'Item Price must be more than 0 and must not be empty',
	  	text:'Enter item price',
	  	footer:'Price at which the item is sold per unit(1)',
		},
	  {
	  	inputAttributes:{
	  		minlength:1,
	  		min:0,
	  		max:1000,
	  		required:true,
	  		placeholder:'Item Quantity',
	  		value:1,
	  	},
	  	input:'number',
	  	validationMessage:'Item Quantity must be more than  0',
	  	// title:'Choose a Password',
	  	text:'Item quantity?',
	  	footer:'Quantity or Number of the item you wish to buy',
		confirmButtonText:'Add Item',
	}
	]).then((result)=>{
		if(result.value){
			var arr = result.value;
			if(arr.length<3){
				Swal.fire({
					timer:2000,
					text:'Empty Item Credentials',
					showConfirmButton:false,
				})
				.then((show)=>{
					this.props.history.push("/");
				})
			}
			else {

			const name = arr[0];
			const price = arr[1] ;
			const quantity = arr[2];
			 if(price==0||price=="0"){
						throw "Price must be greater than zero(0)";
			}
			else if(quantity==0||quantity=="0"){
				throw 'Quantity must be more than zero(0)';
			}
			var arr =  [name,price,quantity];
			arr.forEach((item,index)=>{
				try {
					if(item.indexOf("@")>-1){
						throw "Invalid Item details";
					}
					else if(item.indexOf("~")>-1){
						throw "Invalid Item details";
					}
					else if(price==0){
						throw "Price must be greater than zero(0)"
					}
				}
				catch(err){
					Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:err,
				timer:2000,
			})
			.then((mov)=>{
				this.props.history.push("/add");
			})
				}
			})
			console.log("completed")
			}

		}	
		else {
			this.props.history.push("/app");
		}
	})	
	.catch((err)=>{
		console.log(err);
		this.props.history.push("/");
	})



	}
verify(value,type){
		try {
		if(value==""){
			throw "Empty Form Fields";
			return '';
		}
		else {
		if(type){
		var arr = value.split("");
		var alpha = ("asdfghjklzxcvbnmqwertyuiop").split("");
		arr.forEach((letter)=>{
			var pres = alpha.indexOf(letter);
			if(pres<0){
				throw "Item name contains Invalid characters";
				return '';
			}
			
		})
		return value;
		}
		else {
		var arr = value.split("");
		var alpha = ("0123456789").split("");
		arr.forEach((letter)=>{
			var pres = alpha.indexOf(letter);
			if(pres<0){
				throw "Item price or quantity contains Invalid characters";
				return '';
			}
		})
		return value;
		}


	}
	}
	catch(err){
		toast(err);
	}
	}
	handleSave(){
		var price = this.state.price;
		var quantity = this.state.quantity;
		var name = this.state.name;
		console.log(price,quantity,name);
		if(price==0||quantity==0){
			toast("Price or Quantity cannot be zero(0)")
		}
		else if(price==""||quantity==""||name==""||price==undefined||quantity==undefined||name==undefined){
			toast("Please Fill all empty form Fields");
		}
		else {
		var jwt = localStorage.jwt;
			const obj =  name+"@"+price+"@"+quantity+"@"+jwt;
			//console.log(obj);
			this.loading("Saving Budget");
			fetch("budgetapp/addbudget.php",{
				method:"POST",
				body:obj,	
			})
			.then(response=>response.json())
			.then((data)=>{
				console.log(data);
				if(data.code==200){
					Swal.fire({
				icon:'success',
				showConfirmButton:false,
				text:name+' has been added to budget successfully',
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
			.catch((err)=>{
			Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:err,
				timer:2000,
			})
			.then((mov)=>{
				this.props.history.push("/app");
			})
				});
			var count = parseInt(localStorage.budgetcount);
			var n = count+1;
			localStorage.setItem("budgetcount",n);
		}
	}
	handleName(e){
		const name = e.target.value;
		var arr = name.split("");
		var r = arr.length;
		var last = arr[r-1];
		var alpha = ("asdfghjklzxcvbnmqwertyuiop").split("");
		var u = alpha.indexOf(last);
		if(u<0&&name!=""){
			e.target.value=this.state.name;
		}
		else {
			this.setState({name:name});
		}
	}
	handlePrice(e){
		const name = e.target.value;
		var arr = name.split("");
		var r = arr.length;
		var last = arr[r-1];
		var alpha = ("0123456789").split("");
		var u = alpha.indexOf(last);
		if(u<0&&name!=""){
			e.target.value=this.state.price;
		}
		else {
			this.setState({price:name});
		}
	}
	handleQuan(e){
		const name = e.target.value;
		var arr = name.split("");
		var r = arr.length;
		var last = arr[r-1];
		var alpha = ("0123456789").split("");
		var u = alpha.indexOf(last);
		if(u<0&&name!=""){
			e.target.value=this.state.quantity;
		}
		else {
			this.setState({quantity:name});
		}
	}
	handleBack(){
	this.props.history.goBack();
}
	render(){
		return (
			<React.Fragment>
			<section className="topnav" id="topnav">
				<span className="pagename" id="pagename" onClick={this.handleBack}><i className='fa fa-arrow-left'></i> Add Budget </span>
				
			</section>
				<main>
					<div className="allbudgets">
						<div className="budet">
							<div className="col-md-12">
								<span>Name</span>
								<h4><input type="text" id="itemname" placeholder="Name of Item" onChange={this.handleName.bind(this)}/></h4>
							</div>
							<div className="col-md-12 detarea">
							<div className="col-md-6 pricebord">
								<span>
									Quantity
								</span>
								<h4><input type="number" placeholder="Number of items to be purchased" id="itemq" onChange={this.handleQuan.bind(this)}/></h4>
							</div>
							<div className="col-md-6">
								<span>
									Price per unit 
								</span>
								<h4><input type="number" placeholder="Price for one unit" id="itemprice" onChange={this.handlePrice.bind(this)}/></h4>
							</div>
							</div>
						</div>
						
						<div className="budet">
						<div className="col-md-12 detarea">
						<div className="col-md-6">
							<span className="currency">N</span>{this.state.price*this.state.quantity}
						</div>
						<div className="col-md-6">
							<button className="deletebtn sped" onClick={this.handleSave}><i className="fa fa-angle-double-right"></i></button>
						</div>

						</div>
						</div>
					</div>
				</main>
			</React.Fragment>
		)
	}
}