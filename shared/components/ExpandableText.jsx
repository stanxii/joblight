import React, { Component, PropTypes } from 'react';

import cx from 'classnames';

import Button   from 'react-mdl/lib/Button';
import Markdown from './Markdown.jsx';

if (process.env.BROWSER) {
    require('./ExpandableText.less');
}

const MAX_CHAR_NUMBER = 300;

export default class ExpandableText extends Component {

    static propTypes = {
        text: PropTypes.string
    };

    static contextTypes = { i18n: React.PropTypes.object };

    state = {
        expanded: false
    };

    handleClick = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    };

    render() {
        const { l } = this.context.i18n;

        const { text } = this.props;

        const classes = cx('ExpandableText__text', {
            'minimized': !this.state.expanded
        });

        return (
            <div className='ExpandableText'>
            {
                text.length > MAX_CHAR_NUMBER
                ?
                    <div>
                        <div className={classes}>
                            <Markdown source={text} />
                        </div>
                        <Button
                            colored
                            ripple
                            className = 'ExpandableText__expand-button'
                            onClick   = {this.handleClick}
                        >
                            {
                                this.state.expanded
                                ?
                                    l('Minimize')
                                :
                                    l('Expand')
                            }
                        </Button>
                    </div>
                :
                    <div className='ExpandableText_text'>
                        <Markdown source={text} />
                    </div>
            }
            </div>
        );
    }
}
