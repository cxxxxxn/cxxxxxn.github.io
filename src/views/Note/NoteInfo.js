import React, { Component } from 'react';
import './index.css';

export default class NoteInfo extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

	render(){
        const {title, desc, time, type} = this.props.note;
		return (
			<div className="noteinfo">
                <h3 className="noteinfo-title">{title}</h3>
                <p className="noteinfo-time">{time} | {type}</p>
                <p className="noteinfo-desc">{desc}</p>
			</div>
		  );
	}
};
