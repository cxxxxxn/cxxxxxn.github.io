import React, { Component } from 'react';
import './index.css';

export default class ProjectInfo extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

	render(){
        const {title, desc, time, type} = this.props.project;
		return (
			<div className="projectinfo">
                <h3 className="projectinfo-title">{title}</h3>
                <p className="projectinfo-time">{time} | {type}</p>
                <p className="projectinfo-desc">{desc}</p>
			</div>
		  );
	}
};
