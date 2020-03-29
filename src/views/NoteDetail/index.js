import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import './index.css';
// import Markdown from 'react-markdown'; 
import marked from 'marked';
import hljs from 'highlight.js';

import Mnavbar from './Mnavbar';


export default class NoteDetail extends Component {

    constructor(props){
        super(props);
        this.content = React.createRef();
        this.state = {
            content:"",
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
          .then(text => this.setState({content: text}));
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.note.name !== this.props.note.name){
            fetch(this.props.note.md)
                .then(res => res.text())
                .then(text => this.setState({content: text}));
        }
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     if(nextProps.note.name === this.props.note.name && nextState.md === this.state.md){
    //         return false;
    //     }
    //     return true;
    // }

	render(){
        if(this.state.content){
            const {title, time} = this.props.note;
            const content = <div
                id="note-content"
                ref={this.content}
                className="article-detail"
                dangerouslySetInnerHTML={{
                    __html: marked(this.state.content)
                    }}
                />;
                return (
                    <div className="noteDetail">
                        <Row>
                            <Col lg={3}>
                                <div className="article-navbar big-device">
                                    <h3 className="article-navbar-title">文章目录</h3>
                                    <Mnavbar source={this.state.content}></Mnavbar>
                                </div>
                                <div></div>
                            </Col>
                            <Col xs={12} lg={9}
                                className="article">
                                <h2 className="article-title">{title}</h2>
                                <p className="article-time">{time}</p>
                                {content}
                            </Col>
                        </Row>
                    </div>
                  );
        }else{
            return (<div></div>);
        }
	}
};
