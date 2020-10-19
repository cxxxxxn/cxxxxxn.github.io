import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import './Cxxxxxn.css';

import Navbar from './views/Navbar';
import Footer from './views/Footer';

export default class Cxxxxxn extends Component {

	render(){
		return (
			<div className="Cxxxxxn">
				<Row center="xs">
      				<Col xs={12} md={10} lg={8}> 
					  	<Navbar/>
						{/* <Container/> */}
						<Footer/>
					</Col>
    			</Row>
			</div>
		  );
	}
};
