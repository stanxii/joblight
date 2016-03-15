 /* eslint
    react/no-danger: 0,
    max-params: 0,
    func-style: 0,
    camelcase: 0
*/

import React, { Component, PropTypes } from 'react';

import { activationDescriptionPreset } from './Markdown/presets.js';

import MarkdownIt from 'markdown-it';

const MAX_LINK_LENGTH = 25;

class Markdown extends Component {

    static propTypes = {
        source : PropTypes.string.isRequired
    };

    static defaultProps = {
        source : 'Nothing to view'
    };

    componentWillMount() {
        this.md = new MarkdownIt();
        this.md.configure(activationDescriptionPreset).enable('linkify').enable(['link', 'list', 'emphasis']);

        const customRenderer = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
        const defaultRender = this.md.renderer.rules.link_open || customRenderer;

        this.md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
            const newTokens = tokens;
            const aIndex = newTokens[idx].attrIndex('target');

            if (aIndex < 0) {
                newTokens[idx].attrPush(['target', '_blank']);
            } else {
                newTokens[idx].attrs[aIndex][1] = '_blank';
            }

            if (newTokens[idx].info === 'auto') {
                let href = newTokens[idx].attrs[0][1];

                if (href.length > MAX_LINK_LENGTH) {
                    href = `${href.slice(0, MAX_LINK_LENGTH)}...`;
                    newTokens[idx + 1].content = href;
                }
            }

            return defaultRender(newTokens, idx, options, env, self);
        };
    }

    getMarkdownMarkup = () => {
        const renderedMarkdown = this.md.render(this.props.source);

        return {
            __html : renderedMarkdown
        };
    };

    render() {
        return <div dangerouslySetInnerHTML={this.getMarkdownMarkup()} />;
    }
}

export default Markdown;
