import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import './index.css';
import 'highlight.js/styles/atelier-dune-light.css';

export default class Markdown extends Component {

    constructor(props){
        super(props);
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            smartypants: false,
            highlight: function (str, lang) {
                // 此处判断是否有添加代码语言
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        // 得到经过highlight.js之后的html代码
                        const preCode = hljs.highlight(lang, str, true).value;
                        // 以换行进行分割
                        const lines = preCode.split(/\n/).slice();
                        let html = lines.map((item, index) => {
                            return '<li><span class="line-num" data-line="' + (index + 1) + '">'+(index + 1)+'</span>' + item + '</li>'
                        }).join('')
                        html = '<ol>' + html + '</ol>'
                        return html;
                    } catch (__) {}
                }
                // 未添加代码语言，此处与上面同理
                const preCode = hljs.highlightAuto(str).value;
                const lines = preCode.split(/\n/).slice();
                let html = lines.map((item, index) => {
                    return '<li><span class="line-num" data-line="' + (index + 1) + '">'+(index + 1)+'</span>' + item + '</li>'
                }).join('')
                html = '<ol>' + html + '</ol>'
                return html;
            }
        });
    }

    // function(code) {
    //     return hljs.highlightAuto(code).value;
    // },

    shouldComponentUpdate(nextProps) {
        if (nextProps.source !== this.props.source) {
            return true;
        }else{
            return false;
        }
    }

    render(){
        const {source} = this.props;
        return <div
            id="note-content"
            className="article-detail"
            dangerouslySetInnerHTML={{__html: source?marked(source):null}}
        />;
    }
}