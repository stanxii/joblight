import React, { Component, PropTypes } from 'react';
import { connect }                     from 'react-redux';

import { loadActivation, loadSimilarActivations } from '../../actions/activations';
import connectDataFetchers                        from '../../lib/connectDataFetchers.jsx';
import EmbedEvents                                from '../../utils/EmbedEventsUtil';
import config                                     from '../../config';
import { sendEvent }                              from '../../utils/googleAnalytics';

import ActivationPage from '../../components/pages/ActivationPage.jsx';

const embedEvents = new EmbedEvents({
    embedOrigin: config.embedOrigin
});

class ActivationPageContainer extends Component {
    static propTypes = {
        history   : PropTypes.object,
        dispatch  : PropTypes.func,
        location  : PropTypes.object,
        params    : PropTypes.object,

        activation         : PropTypes.object,
        authorActivations  : PropTypes.array,
        similarActivations : PropTypes.array,
        isLoading          : PropTypes.bool
    };

    static contextTypes = { i18n: PropTypes.object };

    state = {
        sharingLink     : '',
        isLoggingIn     : false
    };

    componentWillMount() {
        const { id, userId } = this.props.params;

        if (userId) {
            this.props.history.replaceState(null, `/activations/${id}`);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoading && !nextProps.isLoading && nextProps.activation) {
            if (nextProps.activation.isSponsored) {
                sendEvent('sponsored activation', 'view', nextProps.activation.name);
            }
            sendEvent('activation', 'view', nextProps.activation.name);
        }

        if (this.props.params.id !== nextProps.params.id) {
            this.props.dispatch(loadActivation(nextProps.params, nextProps.location.query));
            this.props.dispatch(loadSimilarActivations(nextProps.params, nextProps.location.query));
        }
    }

    handlePassActivationClick = (activation) => {
        const isEmbedded = this.props.location.query.embed;
        const { actionId, isSponsored, name } = activation;

        if (isEmbedded) {
            embedEvents.send({
                type : 'PASS_TEST',
                actionId
            });
        } else {
            this.setState({ isLoggingIn: true });
        }

        if (isSponsored) {
            sendEvent('sponsored activation', 'pass', name);
        }
        sendEvent('activation', 'pass', name);
    };

    handleViewAnswers = (activation) => {
        const isEmbedded = this.props.location.query.embed;

        if (isEmbedded && activation.isPassed) {
            const quizSessionId = activation.userQuizSession.id;

            embedEvents.send({
                type : 'VIEW_ANSWERS',
                quizSessionId
            });
        }

        sendEvent('activation', 'view answers', activation.name);
    };

    handleFillProfile = (activation) => {
        const isEmbedded = this.props.location.query.embed;

        if (isEmbedded && activation.isPassed) {
            embedEvents.send({
                type : 'FILL_PROFILE'
            });
        }

        sendEvent('activation', 'fill profile click', activation.name);
    };

    handleSponsoredClick = (activation, buttonLabelForResearch) => {
        const isEmbedded = this.props.location.query.embed;
        const { id } = activation;

        if (isEmbedded) {
            embedEvents.send({
                type         : 'COURSE_REQUEST',
                activationId : id
            });
        } else {
            this.setState({ isLoggingIn: true });
            this.props.history.pushState(null, this.props.location.pathname, {
                requestActivationId: id
            });
        }

        sendEvent('sponsored activation', 'request', activation.name);

        // We conduct research which button label works better
        sendEvent('sponsored request button', 'click', buttonLabelForResearch);
    };

    handleGoBack = () => {
        this.props.history.pushState(null, `/activations`, {
            embed      : this.props.location.query.embed,
            assigneeId : this.props.location.query.assigneeId
        });
    };

    handleActivationClick = (activation) => {
        this.props.history.pushState(null, `/activations/${activation.id}`, {
            embed      : this.props.location.query.embed,
            assigneeId : this.props.location.query.assigneeId
        });

        sendEvent('activation', 'author activation view');
    };

    handleShare = (activation) => {
        this.setState({
            sharingLink : activation.publicLink
        });

        sendEvent('activation', 'share', 'click');
    };

    handleShareResult = (activation) => {
        this.setState({
            sharingLink : activation.userQuizSession.shareResultLink
        });

        sendEvent('activation', 'share result', activation.name);
    };

    handleStopSharing = () => {
        this.setState({
            sharingLink : ''
        });
    };

    handleLoginClose = () => {
        this.setState({
            isLoggingIn : false
        });
    };

    render() {
        const { activation, authorActivations, similarActivations, isLoading } = this.props;
        const { sharingLink, isLoggingIn } = this.state;
        const { embed, assigneeId } = this.props.location.query;

        return (
            <ActivationPage
                activation         = {activation}
                authorActivations  = {authorActivations}
                similarActivations  = {similarActivations}
                sharingLink        = {sharingLink}
                isLoading          = {isLoading}
                isEmbedded         = {Boolean(embed)}
                isLoggingIn        = {isLoggingIn}
                showUserResult     = {activation.isPassed && assigneeId}

                onPass             = {this.handlePassActivationClick}
                onSponsoredClick   = {this.handleSponsoredClick}
                onSubscribe        = {this.handleSubscribeClick}
                onViewAnswers      = {this.handleViewAnswers}
                onFillProfile      = {this.handleFillProfile}
                onActivationClick  = {this.handleActivationClick}
                onGoBack           = {this.handleGoBack}
                onShare            = {this.handleShare}
                onShareResult      = {this.handleShareResult}
                onStopSharing      = {this.handleStopSharing}
                onLoginDialogClose = {this.handleLoginClose}
            />
        );
    }
}

function mapStateToProps({ currentActivation: { activation, authorActivations, similarActivations, isLoading } }) {
    return {
        activation,
        authorActivations,
        similarActivations,
        isLoading
    };
}

export default connect(mapStateToProps)(
    connectDataFetchers(ActivationPageContainer, [loadActivation, loadSimilarActivations])
);
