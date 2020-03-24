import React, { Component } from 'react';
import './index.css';

import Home from '../Home';
import Note from '../Note';
import Project from '../Project';

export default class Container extends Component {

	render(){
        const {content, noteIndex, changeNoteIndex} = this.props;
		return (
			<div className="container">
                {content === "home" && <Home></Home>}
                {content === "note" && <Note noteIndex={noteIndex} changeNoteIndex={changeNoteIndex}></Note>}
                {content === "project" && <Project></Project>}
			</div>
		  );
	}
};
