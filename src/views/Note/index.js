import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import './index.css';

import noteList from '../../notes/noteList'

export default class Note extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        };
    }

	render(){
		return (
			<div className="note">
                <Row center="xs">
                    <Col xsOffset={2} xs={8} className="">note</Col>
                </Row>
                {noteList.map((note)=>{
                    return note;
                })}
			</div>
		  );
	}
};
