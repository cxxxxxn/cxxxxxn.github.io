import React, { Component } from 'react';
import './index.css';
import projectList from '../../data/projectList';
import ProjectInfo from './ProjectInfo';
import publicationList from '../../data/publicationList'
import PublicationInfo from './PublicationInfo';

export default class Project extends Component {

	render(){
		return (
			<div className="project">
				<h3>PUBLICATIONS</h3>
				<div>
					{publicationList.map((publication, index)=>{
						return <PublicationInfo project={publication} key={"publication-"+publication.name}/>;
					})}
				</div>
				<h3>PROJECTS</h3>
				<div>
					{projectList.map((project, index)=>{
						return <ProjectInfo project={project} key={"project-"+project.name}/>;
					})}
				</div>
			</div>
		  );
	}
};
