import React, { Component } from 'react';
import './index.css';

import noteList from '../../data/noteList'
import NoteDetail from '../NoteDetail';
import NoteInfo from './NoteInfo';

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
                    return <div key={"note-"+note.name} onClick={()=>{changeNoteIndex(index)}}>
                        <NoteInfo note={note}/>
                    </div>;
                })}
                {noteIndex > -1 && <NoteDetail note={noteList[noteIndex]}></NoteDetail>}
			</div>
		  );
	}
};
