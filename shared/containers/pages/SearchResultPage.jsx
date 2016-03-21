import React, { Component } from 'react';
import { connect }                     from 'react-redux';


import SearchResultPage from '../../components/pages/SearchResultPage.jsx';

class SearchResultContainer extends Component {

    render() {
        return (
            <SearchResultPage/>
        );
    }
}

export default connect()(SearchResultContainer);
