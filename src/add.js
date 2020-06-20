	import React,{Component} from 'react';
import Swal from 'sweetalert2';

export default class Add extends Component{
	
	state = {
		budgetname:'',
		budgetprice:'',
		budgetquantity:'',
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


componentDidMount(){
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
			var arr =  [name,price,quantity];
			arr.forEach((item,index)=>{
				try {
					if(item.indexOf("@")>-1){
						throw "Invalid Item details";
					}
					else if(item.indexOf("~")>-1){
						throw "Invalid Item details";
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
			var jwt = localStorage.jwt;
			const obj =  name+"@"+price+"@"+quantity+"@"+jwt;
			//console.log(obj);
			this.loading();
			fetch("https://novling.000webhostapp.com/budgetapp/addbudget.php",{
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
		else {
			this.props.history.push("/app");
		}
	})	
	.catch((err)=>{
		console.log(err);
		this.props.history.push("/");
	})



	}
	render(){
		return (
			<div></div>
			)
	}
}