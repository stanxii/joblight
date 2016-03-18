import React, { Component, PropTypes } from 'react';

import LoginDialog from '../containers/LoginDialog.jsx';

import Button from 'react-mdl/lib/Button';

if (process.env.BROWSER) {
    require('./StatusBar.less');
}

export default class StatusBar extends Component {
    static propTypes = {
        displayRightMenu: PropTypes.bool
    };

    static contextTypes = { i18n: PropTypes.object };

    static defaultProps = {
        displayRightMenu: true
    };

    state = {
        isLogginIn: false
    };

    handleLogin = () => {
        this.setState({
            isLoggingIn: true
        });
    };

    handleLoginDialogClose = () => {
        this.setState({
            isLoggingIn: false
        });
    };

    render() {
        const {
            displayRightMenu
            } = this.props;

        const { l } = this.context.i18n;

        const { isLoggingIn } = this.state;

        return (
            <div className=''>

                <LoginDialog
                    isOpen={isLoggingIn}
                    onRequestClose={this.handleLoginDialogClose}
                />

                <div className='app-right-status-bar'>
                    {
                        displayRightMenu ?
                            <Button
                                className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent'
                                onClick={this.handleLogin}
                            >{l('Sign up / Sign in')}
                            </Button>
                            : null
                    }
                </div>
            </div>
        );
    }
}
