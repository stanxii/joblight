import React, { Component } from 'react';
import { connect }                     from 'react-redux';


import JobSearchPage from '../../components/pages/JobSearchPage.jsx';

class JobSearchContainer extends Component {

    render() {
        return (
            <JobSearchPage />
        );
    }
}

export default connect()(JobSearchContainer);
