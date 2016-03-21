import React, { Component, PropTypes } from 'react';

import StatusBar from '../StatusBar.jsx';
import SearchBox from '../SearchBox.jsx';

import Button from 'react-mdl/lib/Button';

if (process.env.BROWSER) {
    require('./JobSearchPage.less');
}

export default class JobSearchPage extends Component {
    static propTypes = {
        search: PropTypes.string,
        onSearch: PropTypes.func
    };

    static contextTypes = { i18n: PropTypes.object };

    static defaultProps = {
        search: ''
    };

    render() {
        const {
            search,
            onSearch
            } = this.props;

        const { l } = this.context.i18n;

        return (
            <div>
                <StatusBar />
                <div className='app_center'>
                    <div className='app_logo'>
                        <div className='hplogo'>
                            <div className='logo'></div>
                        </div>
                    </div>
                </div>
                <div className='search_container'>
                    <SearchBox className = 'App_search' search = {search} onSearch = {onSearch}/>
                    <div className='SearchBox_btn'>
                        <Button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
                            {l('Search Jobs')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
