import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import './index.css';
// import Markdown from 'react-markdown'; 
import marked from 'marked';
import hljs from 'highlight.js';

export default class NoteDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            content:"",
            md:""
        };
    }

    componentDidMount() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            smartypants: false,
            highlight: function(code) {
                return hljs.highlightAuto(code).value;
            },
        });
        
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
        const {title, time} = this.props.note;
		return (
			<div className="noteDetail">
                <h2 className="article-title">{title}</h2>
                <p className="article-time">{time}</p>
                <Row start="xs">
                    <Col xsOffset={1} xs={10}>
                        {/* <Markdown source={this.state.content}/> */}
                        <div
                        id="content"
                        className="article-detail"
                        dangerouslySetInnerHTML={{
                            __html: this.state.content ? marked(this.state.content) : null,
                            }}
                        />
                    </Col>
                </Row>
			</div>
		  );
	}
};
