import React, { Component } from 'react';
import publicationList from '../../data/publicationList'
import PublicationInfo from '../PublicationInfo';
import avatar from '../../imgs/avatar.jpg';

import 'animate.css'
import './index.css';

export default class MainView extends Component {

    render() {
        return (
            <div className='home'>
                <nav className="nav">
                    <a className="bttn-stretch bttn-sm nav-item" href="#about-me">ABOUT ME</a>
                    <a className="bttn-stretch bttn-sm nav-item" href="#publications">PUBLICATIONS</a>
                </nav>
                <main>
                    <section className='about-me' id="about-me">
                        <div className='me'>
                            <img src={avatar} className="home-avatar" alt="Nan Chen's avatar" />
                            <div>
                                <h1 className="home-name">Nan Chen 陈楠</h1>
                                <div className='contact'>
                                    <div>
                                        <a href="mailto:nanchen@microsoft.com" className="contact-item">
                                            <svg t="1603125147800" className="icon icon-brand" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10745" width="20" height="20" aria-hidden="true">
                                                <path d="M853.333333 170.666667 170.666667 170.666667C123.733333 170.666667 85.333333 209.066667 85.333333 256l0 512c0 46.933333 38.4 85.333333 85.333333 85.333333l682.666667 0c46.933333 0 85.333333-38.4 85.333333-85.333333L938.666667 256C938.666667 209.066667 900.266667 170.666667 853.333333 170.666667zM853.333333 341.333333l-341.333333 213.333333L170.666667 341.333333 170.666667 256l341.333333 213.333333 341.333333-213.333333L853.333333 341.333333z" p-id="10746" fill="#777777"></path>
                                            </svg>
                                            <span>nanchen(at)microsoft.com</span>
                                        </a>
                                    </div>
                                    <div>
                                        <a target="_blank" href="https://scholar.google.com/citations?user=Xb-Pvp4AAAAJ" rel="noopener noreferrer" aria-label="Visit Nan Chen's Google Scholar profile" className="contact-item">
                                            <svg t="1754136104809" class="icon icon-brand" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5057" width="20" height="20" aria-hidden="true">
                                                <path d="M781.8 597s0 0.2 0.2 0.2c18.4 38.8 28.8 82.2 28.8 128C810.6 890.2 677 1024 512 1024s-298.6-133.8-298.6-298.6c0-45.8 10.4-89.2 28.8-128 3.4-7.2 7.2-14.4 11.2-21.4 8.8-15.2 18.8-29.4 30-42.6 54.8-65.2 137-106.6 228.8-106.6 67.2 0 129.2 22.2 179.2 59.8 18.2 13.8 34.8 29.4 49.6 47 11.2 13.2 21.2 27.6 30 42.6 4 6.8 7.6 14 11 21z m52.8-37.6c-60.2-116.8-182-196.8-322.6-196.8s-262.4 80-322.6 196.8L0 405.4 512 0l512 405.4-189.4 154.2z" p-id="5058"></path>
                                            </svg>
                                            <span>Google Scholar</span>
                                        </a>
                                    </div>
                                    <div>
                                        <a target="_blank" href="https://github.com/cxxxxxn" rel="noopener noreferrer" aria-label="Visit Nan Chen's GitHub profile" className="contact-item">
                                            <svg t="1603124781200" className="icon icon-brand" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4666" width="20" height="20" aria-hidden="true">
                                                <path d="M938.666667 512a426.666667 426.666667 0 0 1-291.84 404.48 22.186667 22.186667 0 0 1-19.2-2.986667 21.76 21.76 0 0 1-8.96-17.493333v-113.92a170.666667 170.666667 0 0 0-21.333334-87.893333 10.666667 10.666667 0 0 1 0-11.52 11.52 11.52 0 0 1 8.533334-5.973334c104.106667-10.666667 162.133333-52.053333 162.133333-164.693333a200.96 200.96 0 0 0-50.773333-143.36 183.466667 183.466667 0 0 0 8.106666-51.2 184.746667 184.746667 0 0 0-6.4-46.08 20.906667 20.906667 0 0 0-22.613333-15.36 189.866667 189.866667 0 0 0-104.106667 50.346667 422.826667 422.826667 0 0 0-160.426666 0A189.866667 189.866667 0 0 0 327.68 256a20.906667 20.906667 0 0 0-22.613333 15.36A184.746667 184.746667 0 0 0 298.666667 317.44a183.466667 183.466667 0 0 0 8.106666 51.2A200.96 200.96 0 0 0 256 512c0 118.613333 64.426667 158.293333 182.613333 168.106667a158.293333 158.293333 0 0 0-29.44 65.28v5.12a29.013333 29.013333 0 0 0 0 5.973333 25.173333 25.173333 0 0 1-27.306666 21.76 42.666667 42.666667 0 0 1-18.346667-5.12 227.84 227.84 0 0 1-60.586667-53.76 430.506667 430.506667 0 0 0-34.133333-34.56 116.906667 116.906667 0 0 0-25.173333-16.64 20.906667 20.906667 0 0 0-20.48 0 21.333333 21.333333 0 0 0-9.813334 17.92v2.56a21.333333 21.333333 0 0 0 9.813334 17.92 193.706667 193.706667 0 0 1 39.253333 44.8 282.026667 282.026667 0 0 0 67.84 73.386667 105.813333 105.813333 0 0 0 59.733333 17.92h15.36V896a21.76 21.76 0 0 1-8.96 17.493333 22.186667 22.186667 0 0 1-19.2 2.986667A426.666667 426.666667 0 1 1 938.666667 512z" p-id="4667"></path>
                                            </svg>
                                            <span>@cxxxxxn</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="home-info home-info-1"> <div className="animate__animated animate__shakeX">Welcome<span role="img" aria-label="hello">👋</span></div></div>

                        <div className="home-info home-info-1"> I'm a Research SDE at Microsoft Research Asia (MSRA), focusing on human-computer interaction, <b>human-AI interaction</b>, and data visualization. My research explores how technologies like large language models can empower people, especially by advancing <b>accessibility</b>.</div>

                        <div className="home-info home-info-1"> I received my master's degree in AI and Data Design from Tongji University, under the supervision of <a href="http://nancao.org/" target="_blank" rel="noopener noreferrer">Prof. Nan Cao</a> at the <a href="https://idvxlab.com/" target="_blank" rel="noopener noreferrer">iDVX Lab</a>. Prior to that, I earned my bachelor's degree in Software Engineering from Tongji University. </div>
                    </section>

                    <section className="pulications" id="publications">
                        <h2>PUBLICATIONS</h2>
                        <div>
                            {publicationList.map((publication, index) => {
                                return <PublicationInfo project={publication} key={"publication-" + publication.name} />;
                            })}
                        </div>
                    </section>

                </main>
            </div>
        );
    }
};
