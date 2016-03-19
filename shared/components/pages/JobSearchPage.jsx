import React, { Component, PropTypes } from 'react';

import StatusBar from '../StatusBar.jsx';
import SearchBox from '../SearchBox.jsx';

if (process.env.BROWSER) {
    require('./JobSearchPage.less');
}

export default class JobSearchPage extends Component {
    static propTypes = {
        className: PropTypes.string,
        search: PropTypes.string,
        onSearch: PropTypes.func
    };

    static contextTypes = { i18n: PropTypes.object };

    static defaultProps = {
        search: ''
    };

    render() {
        const {
            className,
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
                    <SearchBox className = 'App_search' search = {search} onSearch = {onSearch} />
                </div>
            </div>
        );
    }
}
