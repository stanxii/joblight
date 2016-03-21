import React, { Component, PropTypes } from 'react';

if (process.env.BROWSER) {
    require('./SearchBox.less');
}

const ENTER_KEY = 13;

export default class SearchBox extends Component {
    static propTypes = {
        search   : PropTypes.string,
        onSearch : PropTypes.func
    };

    static contextTypes = { i18n: PropTypes.object };

    handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            this.props.onSearch(e.target.value);
        }
    };

    handleSearchChange = (e) => {
        const value = e.target.value;

        if (!value) {
            this.props.onSearch(value);
        }
    };

    render() {
        const { search } = this.props;
        const { l } = this.context.i18n;

        return (
            <div>
                <div className='SearchBox'>
                    <div
                        className='SearchBox__box'
                    >
                        <input
                            className    = 'SearchBox__input'
                            type         = 'text'
                            ref          = {ref => this._input = ref}
                            placeholder  = {l('Keywords')}
                            defaultValue = {search}
                            onChange     = {this.handleSearchChange}
                            onKeyDown    = {this.handleKeyDown}
                        />
                    </div>
                    <div
                        className='SearchBox__box'
                    >
                        <input
                            className    = 'SearchBox__input'
                            type         = 'text'
                            ref          = {ref => this._input = ref}
                            placeholder  = {l('Location')}
                            defaultValue = {search}
                            onChange     = {this.handleSearchChange}
                            onKeyDown    = {this.handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

