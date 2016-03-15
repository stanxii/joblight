import React, { Component, PropTypes } from 'react';

import WelcomeDialog from '../../containers/WelcomeDialog.jsx';
import Footer        from '../../containers/Footer.jsx';

if (process.env.BROWSER) {
    require('./MainLayout.less');
}

export default class MainLayout extends Component {

    static propTypes = {
        showWelcomeScreen      : PropTypes.bool,
        showFooter             : PropTypes.bool,
        children               : PropTypes.object,
        footerLinks            : PropTypes.object,
        onWelcomeScreenDismiss : PropTypes.func
    };

    render() {
        const { showWelcomeScreen, showFooter, children, onWelcomeScreenDismiss } = this.props;

        return (
            <div className='MainLayout'>
                <div className='MainLayout__content'>
                    <WelcomeDialog
                        isOpen={showWelcomeScreen}
                        onDismiss={onWelcomeScreenDismiss}
                    />
                    {children}
                </div>

                {
                    showFooter
                    ? <Footer />
                    : null
                }
            </div>
        );
    }
}
