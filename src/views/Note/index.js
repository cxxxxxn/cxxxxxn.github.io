import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import './index.css';

import noteList from '../../notes/noteList'
import NoteDetail from '../NoteDetail';

export default class Note extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

	render(){
        const {noteIndex,changeNoteIndex} = this.props;
		return (
			<div className="note">
                {noteIndex === -1 && noteList.map((note, index)=>{
                    return <div key={"note-"+note.name} onClick={()=>{changeNoteIndex(index)}}>{note.name}</div>;
                })}
                {noteIndex > -1 && <NoteDetail note={noteList[noteIndex]}></NoteDetail>}
			</div>
		  );
	}
};
