import React, { Component, PropTypes } from 'react';

import EmbedEvents              from '../utils/EmbedEventsUtil';
import config                   from '../config';
import { initialize, navigate } from '../utils/googleAnalytics';

if (process.env.BROWSER) {
    require('../assets');
}

const embedEvents = new EmbedEvents({
    embedOrigin: config.embedOrigin
});

export default class App extends Component {
    static propTypes = {
        location : PropTypes.object,
        routes   : PropTypes.array,
        children : PropTypes.object,
        history  : PropTypes.object
    };

    componentDidMount() {
        initialize();
        navigate({
            page  : this.props.location.pathname,
            title : this.props.routes[this.props.routes.length - 1].path
        });
    }

    componentWillReceiveProps(nextProps) {
        const isEmbed = this.props.location.query.embed;
        const hasPathnameChanged = this.props.location.pathname !== nextProps.location.pathname;
        const hasQueryChanged = this.props.location.query !== nextProps.location.query;

        if (hasPathnameChanged) {
            navigate({
                page  : nextProps.location.pathname,
                title : nextProps.routes[nextProps.routes.length - 1].path
            });
        }

        if (isEmbed && hasPathnameChanged || hasQueryChanged) {
            const pathname = nextProps.location.pathname;
            const {
                embed,
                assigneeId,
                locale,
                ...query
            } = nextProps.location.query;
            const quizWallEmbedPath = this.props.history.createHref(pathname, query);

            embedEvents.send({
                type : 'PATH_CHANGED',
                quizWallEmbedPath
            });
        }
    }

    render() {
        return (
            <div id='app-view'>
                {this.props.children}
            </div>
        );
    }
}
