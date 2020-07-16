import React,{Component} from 'react';
import {NavLink,Link} from 'react-router-dom';

class Budget extends Component{
	render(){
		if(this.props.itemid==""||this.props.itemid==undefined){
			var link = "/share/"+this.props.code+"/"+this.props.budgetid;
			var key = this.props.budgetid;
		}
		else {

			var link = "/budget/"+this.props.itemid;
			var key = this.props.itemid;
		}
		
		return (
			<NavLink to={link}>
			<div className='budget'  key={key}>
							<span className="itemname">
								{this.props.budgetname}
							</span>
							<span className='itemprice'>
							&#8358;<span className="total" total={this.props.budgetprice*this.props.quantity}> {this.props.budgetprice*this.props.quantity} </span> - Quantity : {this.props.quantity} at &#8358; {this.props.budgetprice}

							</span>
			</div>
			</NavLink>
		)
	}
}
export default Budget;