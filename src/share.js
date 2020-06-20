import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Share from './sh';
class Budget extends Component{
	render(){
		console.log(this.props.budgets.length);
		return (
				this.props.budgets.map((item)=>{
					if(item==""||item.code==""){

					}
					else {
						return <Share code={item.code} visits={item.visits} date={item.date}/>
					}
				})
				
				)
	}
}
export default Budget;