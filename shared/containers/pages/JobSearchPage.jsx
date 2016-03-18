import React, { Component } from 'react';
import { connect }                     from 'react-redux';


import StatusBar from '../../components/StatusBar.jsx';

class JobSearchContainer extends Component {

    render() {
        return (
            <StatusBar />
        );
    }
}

export default connect()(JobSearchContainer);
