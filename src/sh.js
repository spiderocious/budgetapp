import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Budget extends Component{
	render(){
		const link = "/shares/"+this.props.code;
		return (
			<Link to={link}>
			<div className="budget review" style={{"textAlign":"center"}}>
							<span className="itemname">{this.props.code}</span>
							<span className="itemname">{this.props.visits}</span>
							<span className="itemname desktop">{this.props.date}</span>
						</div>
						
			</Link>
		)
	}
}
export default Budget;