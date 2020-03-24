import React, { Component } from 'react';
import './index.css';

import Home from '../Home';
import Note from '../Note';
import Project from '../Project';

const contentMap = {
    "home": <Home></Home>,
    "note": <Note></Note>,
    "project": <Project></Project>
}

export default class Container extends Component {

	render(){
        const {content} = this.props;
		return (
			<div className="container">
                {contentMap[content]}
			</div>
		  );
	}
};
