import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import './index.css';

export default class Project extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        };
    }

	render(){
		return (
			<div className="project">
                <Row center="xs">
                    <Col xsOffset={2} xs={8} className="">project</Col>
                </Row>
			</div>
		  );
	}
};
