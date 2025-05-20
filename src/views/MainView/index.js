import React, { Component } from 'react';
import './index.css';

import Container from '../Container';

export default class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            folding: true,
            content: 'home',
            noteIndex: -1
        };
    }

    handleToggle = () => {
        this.setState((prevState) => {
            const { folding } = prevState;
            return {
                folding: !folding
            }
        });
    }

    changeContent = (content) => {
        this.setState({
            content,
            folding: true,
            noteIndex: -1
        });
    }

    changeNoteIndex = (noteIndex) => {
        this.setState({
            noteIndex
        });
    }

    render() {
        return (
            <div className='main'>
                <div className="navbar">
                    <div className="nav-container">
                        {/* small devices */}
                        <nav className="nav-collapse">
                            <div className="bttn-stretch bttn-sm nav-item" onClick={() => this.changeContent("home")}>HOME</div>
                            <div className="bttn-stretch bttn-sm nav-item" onClick={() => this.changeContent("project")}>PROJECT</div>
                            {/* <div className="bttn-stretch bttn-sm nav-item" onClick={() => this.changeContent("note")}>NOTE</div> */}
                        </nav>
                        {/* larger devices */}
                        <nav className="nav-toggle">
                            <div end="xs">
                                <div xs={12}>
                                    <svg className="nav-toggle-button" width="20" height="20"
                                        onClick={this.handleToggle}
                                        t="1584953996292" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3341"><path d="M989.184 119.296H38.272c-19.2 0-34.816 15.552-34.816 34.816v23.168c0 19.2 15.552 34.816 34.816 34.816h950.976A34.816 34.816 0 0 0 1024 177.28v-23.232c0-19.2-15.552-34.752-34.816-34.752z m0 324.736H38.272c-19.2 0-34.816 15.552-34.816 34.816v23.168c0 19.2 15.552 34.816 34.816 34.816h950.976c19.2 0 34.816-15.552 34.816-34.816v-23.232a34.88 34.88 0 0 0-34.88-34.752z m0 324.672H38.272c-19.2 0-34.816 15.552-34.816 34.816v23.168c0 19.2 15.552 34.816 34.816 34.816h950.976c19.2 0 34.816-15.552 34.816-34.816v-23.168a34.88 34.88 0 0 0-34.88-34.816z" p-id="3342"></path></svg>
                                </div>
                            </div>
                            {!this.state.folding && <div className="nav-toggle-vertical">
                                <div end="xs" className="nav-item" onClick={() => this.changeContent("project")}>PROJECT</div>
                                <div end="xs" className="nav-item" onClick={() => this.changeContent("note")}>NOTE</div>
                                {/* <div end="xs" className="nav-item" onClick={() => this.changeContent("home")}>HOME</div> */}
                            </div>}
                        </nav>
                    </div>
                </div>
                <div>
                    <Container content={this.state.content} noteIndex={this.state.noteIndex} changeNoteIndex={this.changeNoteIndex} />
                </div>
            </div>
        );
    }
};
