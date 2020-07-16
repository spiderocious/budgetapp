import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Budget extends Component{
	render(){
		const link = "/shares/"+this.props.code;
		if(this.props.budgetname===""){
			var name = this.props.code;
		}
		else {
			var name = this.props.budgetname;
		}
		return (
			<Link to={link}>
			<div className="budget review" style={{"textAlign":"center"}}>
							<span className="itemname">{name}</span>
							<span className="itemname">{this.props.visits}</span>
							<span className="itemname desktop">{this.props.date}</span>
						</div>
						
			</Link>
		)
	}
}
export default Budget;