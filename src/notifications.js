import React,{Component} from 'react';

export default class Notifications extends Component{
	state = {
		notifications:[],
	}
	render(){
		return (
			<main>
			<div className="allbudgets">
				<div className="budget col-md-8 text-center">Notifications</div>
				<div className="budget" style={{"textAlign":"center"}}><span className="itemname">Debayo sent you an invite for team-budget</span></div>
				<div className="budget" style={{"textAlign":"center"}}><span className="itemname">Your budget (jollof rice) was accepted by team-picnic-budget</span></div>
				</div>
			</main>
		)
	}
}