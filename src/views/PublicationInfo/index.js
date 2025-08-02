import React, { Component } from 'react';
import './index.css';
import {homepageList, itsMe} from '../../data/author'

export default class PublicationInfo extends Component {

	renderLink(label, url) {
        return url ? (
            <>	
				{
					label === 'Paper' ? <span className="pulication-info-time"> {url?'':'To Appear'}</span> : <span className="pulication-info-time"> | </span>
				}
                <a
                    className="pulication-info-time pulication-info-download"
                    target="_blank"
                    href={url}
                    rel="noopener noreferrer"
                >
                    {label}
                </a>
            </>
        ) : null;
    }

	render(){
        const {title, conference, img, authors, paper, vedio, code, media} = this.props.project;
		return (
			<div className="pulication-info">
                <img className="pulication-info-img" src={img} alt='A figure in the paper'></img>
                <div className="pulication-info-words">
                    <a className="pulication-info-title" target="_blank" href={paper} rel="noopener noreferrer">{title}</a>
                    <div className="pulication-info-authors">
                        {authors.map((author, index) => {
                            let str = index !== authors.length - 1 ? author+", ": author;
                            if(author === itsMe){
                                return <span className='itsMe pulication-info-author' key={author} >{str} </span>
                            }else if(homepageList[author]){
                                return <a href={homepageList[author] || ''} className='pulication-info-author' key={author} target="_blank" rel="noopener noreferrer">{str} </a>
                            }else{
                                return <span className='pulication-info-author' key={author} >{str} </span>
                            }
                        })}
                    </div>
                    <p className="pulication-info-desc">{conference}</p>

					{this.renderLink('Paper', paper)}
					{this.renderLink('Code', code)}
                    {this.renderLink('Media', media)}
                    {this.renderLink('Vedio', vedio)}
                </div>
			</div>
		  );
	}
};
