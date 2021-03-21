import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import './Cxxxxxn.css';
import './libs/bttn.min.css'

import MainView from './views/MainView';
import Footer from './views/Footer';

export default class Cxxxxxn extends Component {
	constructor(props) {
        super(props);

        //sketch css
        if ("paintWorklet" in CSS) {
            CSS.paintWorklet.addModule(`${process.env.PUBLIC_URL}/sketch.js`);
        }
	}
	
	render(){
		return (
			<div className="Cxxxxxn">
				<Row center="xs">
      				<Col xs={12} md={10} lg={8}> 
                        <MainView/>
                        <Footer/>
                    </Col>
    			</Row>
			</div>
		  );
	}
};
