import React, { Component } from 'react';
import './index.css';
import {homepageList, itsMe} from '../../data/author'

export default class PublicationInfo extends Component {

	render(){
        const {title, conference, img, authors, paper, vedio} = this.props.project;
		return (
			<div className="projectinfo">
                <img className="projectinfo-img" src={img} alt='title'></img>
                <div className="projectinfo-words">
                    <a className="projectinfo-title" target="_blank" href={paper} rel="noopener noreferrer">{title}</a>
                    <div className="projectinfo-authors">
                        {authors.map((author, index) => {
                            let str = index !== authors.length - 1 ? author+", ": author;
                            if(author === itsMe){
                                return <span className='itsMe projectinfo-author' key={author} >{str} </span>
                            }else if(homepageList[author]){
                                return <a href={homepageList[author] || ''} className='projectinfo-author' key={author} target="_blank" rel="noopener noreferrer">{str} </a>
                            }else{
                                return <span className='projectinfo-author' key={author} >{str} </span>
                            }
                        })}
                    </div>
                    <p className="projectinfo-desc">{conference}</p>
                    <a className="projectinfo-time" target="_blank" href={paper} rel="noopener noreferrer"> {paper?' Paper':'To Appear'}</a>
                    <a className="projectinfo-time" target="_blank" href={vedio} rel="noopener noreferrer"> {vedio?' | Vedio':''} </a>
                </div>
			</div>
		  );
	}
};
