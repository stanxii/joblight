import React, { Component, PropTypes } from 'react';

import SearchBox      from './SearchBox.jsx';
import LanguageSwitch from '../containers/LanguageSwitch.jsx';
import LoginDialog    from '../containers/LoginDialog.jsx';

import Button from 'react-mdl/lib/Button';

if (process.env.BROWSER) {
    require('./AppBar.less');
}

const LOGO_SRC = '/static/logo.png';

export default class AppBar extends Component {
    static propTypes = {
        className        : PropTypes.string,
        title            : PropTypes.string,
        search           : PropTypes.string,
        displayRightMenu : PropTypes.bool,
        displaySearch    : PropTypes.bool,
        rightIconName    : PropTypes.string,
        fixOnScroll      : PropTypes.bool,
        scrollOffset     : PropTypes.number,
        onRightIconClick : PropTypes.func,
        onSearch         : PropTypes.func
    };

    static contextTypes = { i18n: PropTypes.object };

    static defaultProps = {
        title            : '',
        search           : '',
        fixOnScroll      : true,
        displaySearch    : true,
        displayRightMenu : true,
        rightIconName    : '',
        scrollOffset     : 0
    };

    state = {
        isFixedToTop : false,
        isLoggingIn  : false
    };

    componentDidMount() {
        if (this.props.fixOnScroll) {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

    componentWillUnmount() {
        if (this.props.fixOnScroll) {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }

    handleScroll = () => {
        const scrollTop = (window.pageYOffset !== undefined)
            ? window.pageYOffset
            : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        const isFixedToTop = scrollTop > this.props.scrollOffset;

        if (isFixedToTop !== this.state.isFixedToTop) {
            this.setState({ isFixedToTop });
        }
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
            title,
            search,
            className,
            displaySearch,
            displayRightMenu,
            rightIconName,
            onRightIconClick,
            onSearch
        } = this.props;

        const { l } = this.context.i18n;

        const { isLoggingIn, isFixedToTop } = this.state;


        return (
            <div className='AppBar'>

                <LoginDialog
                    isOpen={isLoggingIn}
                    onRequestClose={this.handleLoginDialogClose}
                />

                <div className='AppBar__left'>
                    {
                        rightIconName
                            ? <IconButton name={rightIconName} onClick={onRightIconClick} />
                            : <img
                                width='40px'
                                height='40px'
                                src={LOGO_SRC}
                                className='AppBar__logo'
                              />
                    }

                </div>
                {
                    displaySearch
                        ? <div className='AppBar__center'>
                            <SearchBox
                                className = 'AppBar__search'
                                search    = {search}
                                onSearch  = {onSearch}
                            />
                            <Button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'>搜索职位</Button>
                        </div>
                        : null

                }

                {
                    displayRightMenu
                    ? <div className='AppBar__right'>
                        <LanguageSwitch className='AppBar__lang' />
                        <span className='AppBar__menu-item' onClick={this.handleLogin}>
                            {l('Sign up / Sign in')}
                        </span>
                    </div>
                    : null
                }
            </div>
        );
    }
}
