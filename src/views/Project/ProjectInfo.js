import React, { Component } from 'react';
import './index.css';
import {homepageList, itsMe} from '../../data/author'

export default class ProjectInfo extends Component {
	render(){
        const {title, desc, time, type, img, authors, url, skill} = this.props.project;
		return (
			<div className="projectinfo">
                <img className="projectinfo-img" src={img} alt='title'></img>
                <div className="projectinfo-words">
                    <a className="projectinfo-title" target="_blank" href={url} rel="noopener noreferrer">{title}</a>
                    <div className="projectinfo-authors">
                        {authors.map((author, index) => {
                            let str = index !== authors.length - 1 ? author+", ": author;
                            if(author === itsMe){
                                return <span className='itsMe projectinfo-author' key={author} >{str} </span>
                            }
                            return <a href={homepageList[author] || ''} className='projectinfo-author' key={author} target="_blank" rel="noopener noreferrer">{str} </a>
                        })}
                    </div>
                    <p className="projectinfo-desc">{desc}</p>
                    <p className="projectinfo-time">{time} | {type} <b>( {skill} )</b></p>
                </div>
			</div>
		  );
	}
};
