import React, { Component } from 'react';

import AppBar from '../AppBar.jsx';

import { Grid, Cell, List, ListItem, ListItemContent, ListItemAction, Icon } from 'react-mdl';

if (process.env.BROWSER) {
    require('./SearchResultPage.less');
}

export default class SearchResultPage extends Component {
    render() {
        return (
            <div>
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
                        <List style={{width: '650px'}}>
                            <ListItem threeLine>
                                <ListItemContent subtitle='Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.'>
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
