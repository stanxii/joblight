import React, { Component } from 'react';
import cx    from 'classnames';

import AppBar from '../AppBar.jsx';

import { Grid, Cell, List, ListItem, ListItemContent, ListItemAction, Icon } from 'react-mdl';

if (process.env.BROWSER) {
    require('./SearchResultPage.less');
}

export default class SearchResultPage extends Component {
    static propTypes = {
        isLoading              : React.PropTypes.bool,
        isEmbedded             : React.PropTypes.bool
    };

    render() {
        const {
            isLoading,
            isEmbedded
        } = this.props;

        const classes = cx('SearchResultPage', {
            'SearchResultPage--embedded' : isEmbedded,
            'SearchResultPage--loading'  : isLoading
        });

        return (
            <div className={classes}>
                <AppBar />
                <Grid className='demo-grid-ruler'>
                    <Cell col={2}>
                        <h6>Listed Date</h6>
                        <List>
                            <ListItem>
                                <ListItemContent icon='person'>Last 24 hours</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent icon='person'>Last 7 days</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent icon='person'>Last 14 days</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent icon='person'>Last 30 days</ListItemContent>
                            </ListItem>
                        </List>
                    </Cell>
                    <Cell col={10}>
                        <List className='SearchResultPage__list-container'>
                            <ListItem threeLine>
                                <ListItemContent subtitle='Bryan Cranston played the role of fore Middle.'>
                                    C++ Developer
                                </ListItemContent>
                                <ListItemAction>
                                    <Icon name='star' />
                                </ListItemAction>
                            </ListItem>
                        </List>
                    </Cell>
                </Grid>
            </div>
        );
    }
}
