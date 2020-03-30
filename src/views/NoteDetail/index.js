import React, { Component } from 'react';
import {Row, Col } from 'react-flexbox-grid';
import './index.css';

import Mnavbar from './Mnavbar';
import Markdown from './Markdown';


export default class NoteDetail extends Component {

    constructor(props){
        super(props);
        this.content = React.createRef();
        this.state = {
            content:"",
            navbarStick: false
        };
    }

    componentDidMount() {
        fetch(this.props.note.md)
          .then(res => res.text())
          .then(text => this.setState({content: text}));

        document.addEventListener('scroll', this.winScroll, false);
    }

    componentDidUpdate(prevProps){
        if(prevProps.note.name !== this.props.note.name){
            fetch(this.props.note.md)
                .then(res => res.text())
                .then(text => this.setState({content: text}));
        }
    }

    componentWillUnmount(){
        document.removeEventListener('scroll', this.winScroll, false);
    }

    winScroll = ()=>{
        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        if(scrollTop > 90){
            this.setState((prevState) => {
                if(!prevState.navbarStick){
                    return {
                        navbarStick: true
                    }
                }
            });
        }else if(scrollTop < 90){
            this.setState((prevState) => {
                if(prevState.navbarStick){
                    return {
                        navbarStick: false
                    }
                }
            });
        }
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     if(nextProps.note.name === this.props.note.name && nextState.md === this.state.md){
    //         return false;
    //     }
    //     return true;
    // }
    
    render(){
        const {content} = this.state;
        if(content){
            const {title, time} = this.props.note;
            const navbarClassName ="article-navbar big-device " + (this.state.navbarStick?"article-navbar-stick":null)
            return (
                <div className="noteDetail">
                    <Row>
                        <Col lg={3}>
                            <div className={navbarClassName}>
                                <h3 className="article-navbar-title">目 录</h3>
                                <Mnavbar source={content}></Mnavbar>
                            </div>
                        </Col>
                        <Col xs={12} lg={9}
                            className="article">
                            <h2 className="article-title">{title}</h2>
                            <p className="article-time">{time}</p>
                            <Markdown source={content}></Markdown>
                        </Col>
                    </Row>
                </div>
                );
        }else{
            return <div></div>
        }
    }
};
