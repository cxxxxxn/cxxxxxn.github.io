import chartseq from '../imgs/chartseq.png';
import visact from '../imgs/visact.png';
import trammelgraph from '../imgs/trammelgraph.png';
import visualcausality from '../imgs/visualcausality.png';
import viseval from '../imgs/viseval.png';
import dseval from '../imgs/dseval.png';
import calliopenet from '../imgs/calliopenet.png';

const publicationList = [{
    'name': 'viseval',
    'title': "VisEval: A Benchmark for Data Visualization in the Era of Large Language Models",
    'conference': "IEEE Transactions on Visualization and Computer Graphics (VIS 2024). 🏆 Best Paper Award",
    'img': viseval,
    'paper': 'https://arxiv.org/abs/2407.00981',
    'code': 'https://github.com/microsoft/VisEval',
    'media': 'https://www.microsoft.com/en-us/research/articles/viseval/',
    'authors': ['Nan Chen', 'Yuge Zhang', 'Jiahang Xu', 'Kan Ren', 'Yuqing Yang']
}, {
    'name': 'dseval',
    'title': "Benchmarking Data Science Agents",
    'conference': "Association for Computational Linguistics (ACL 2024).",
    'img': dseval,
    'paper': 'https://arxiv.org/abs/2402.17168',
    'code': 'https://github.com/MetaCopilot/dseval',
    'authors': ['Yuge Zhang', 'Qiyang Jiang', 'Xingyu Han', 'Nan Chen', 'Yuqing Yang', 'Kan Ren']
}, {
    'name': 'calliope-net',
    'title': "Calliope-Net: Automatic Generation of Graph Data Facts via Annotated Node-link Diagrams",
    'conference': "IEEE Transactions on Visualization and Computer Graphics (VIS 2023).",
    'img': calliopenet,
    'paper': 'https://arxiv.org/abs/2308.06441',
    'authors': ['Qing Chen', 'Nan Chen', 'Wei Shuai', 'Guande Wu', 'Zhe Xu', 'Hanghang Tong', 'Nan Cao']
},
{
    'name': 'visualcausality',
    'title': "Visual Causality Analysis of Event Sequence Data",
    'conference': "IEEE Transactions on Visualization and Computer Graphics (VIS 2020).",
    'img': visualcausality,
    'paper': 'https://arxiv.org/abs/2009.00219',
    'vedio': 'https://www.youtube.com/watch?v=JWhyQxA7SEg',
    'authors': ['Zhuochen Jin', 'Shunan Guo', 'Nan Chen', 'Daniel Weiskopf', 'David Gotz', 'Nan Cao']
}, {
    'name': 'trammelgraph',
    'title': "TrammelGraph: Visual Graph Abstraction for Comparison",
    'conference': "Journal of Visualization (ChinaVis 2020)",
    'img': trammelgraph,
    'paper': 'https://link.springer.com/article/10.1007/s12650-020-00706-2',
    'authors': ['Zhuochen Jin', 'Nan Chen', 'Yang Shi', 'Weihong Qian', 'Maoran Xu', 'Nan Cao']
}, {
    'name': 'chartseq',
    'title': "Task-Oriented Optimal Sequencing of Visualization Charts",
    'conference': "In Symposium on Visualization in Data Science at IEEE VIS (VDS 2019)",
    'paper': "https://arxiv.org/abs/1908.02502",
    'vedio': 'https://vimeo.com/378346874',
    'img': chartseq,
    'authors': ['Danqing Shi', 'Yang Shi', 'Xinyue Xu', 'Nan Chen', 'Siwei Fu', 'Hongjin Wu', 'Nan Cao']
}, {
    'name': 'visact',
    'title': "VisAct: a visualization design system based on semantic actions",
    'conference': "Journal of Visualization (ChinaVis 2019)",
    'paper': "https://link.springer.com/article/10.1007/s12650-019-00617-x",
    'img': visact,
    'authors': ['Hongjin Wu', 'Danqing Shi', 'Nan Chen', 'Yang Shi', 'Zhuochen Jin', 'Nan Cao']
}];

export default publicationList;