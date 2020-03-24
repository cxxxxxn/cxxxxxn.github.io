import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import avatar from '../../imgs/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import './index.css';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        };
    }

	render(){
		return (
			<div className="home">
                <div className="home-block"></div>
                <Row center="xs">
                    <img src={avatar} className="home-avatar" alt="avatar" />
                </Row>
                <div className="home-info home-name">Chen Nan</div>
                <div className="home-info">Tongji University D&I</div>
                <div className="home-info">Data Visualization</div>
                <div className="home-block"></div>
                <div className="home-info home-info-1">“Coding, Studing, Living”</div>
                <div className="home-block"></div>
                <div className="home-block"></div>
                <div className="home-block"></div>
                <a target="_blank" href="https://github.com/cxxxxxn">
                    <FontAwesomeIcon icon={faGithub} className="fa-2x github"/>
                </a>
                <div className="home-block"></div>
			</div>
		  );
	}
};
