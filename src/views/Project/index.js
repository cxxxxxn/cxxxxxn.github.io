import React, { Component } from 'react';
import './index.css';
import projectList from '../../data/projectList'
import ProjectInfo from './ProjectInfo';

export default class Project extends Component {

	render(){
		return (
			<div className="project">
                {projectList.map((project, index)=>{
                    return <a key={"project-"+project.name} target="_blank" href={project.url} rel="noopener noreferrer">
                        <ProjectInfo project={project}/>
                    </a>;
                })}
			</div>
		  );
	}
};
