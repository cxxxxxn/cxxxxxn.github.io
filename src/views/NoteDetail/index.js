import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import './index.css';
import Markdown from 'react-markdown'; 

export default class NoteDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            content:"",
            md:""
        };
    }

    componentDidMount() {
        fetch(this.props.note.md)
          .then(res => res.text())
          .then(text => this.setState({content: text, md:this.props.note.md}));
    }

    componentDidUpdate(){
        fetch(this.props.note.md)
          .then(res => res.text())
          .then(text => this.setState({content: text, md:this.props.note.md}));
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.note.name === this.props.note.name && nextState.md === this.state.md){
            return false;
        }
        return true;
    }

	render(){
		return (
			<div className="noteDetail">
                <Row start="xs">
                    <Col xsOffset={1} xs={10}>
                        <Markdown source={this.state.content}/>
                    </Col>
                </Row>
			</div>
		  );
	}
};
