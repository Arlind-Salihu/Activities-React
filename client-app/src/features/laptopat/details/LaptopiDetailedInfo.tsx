
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Laptopi} from "../../../app/models/laptopi";

interface Props {
    laptopi: Laptopi
}

export default observer(function LaptopiDetailedInfo({laptopi}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{laptopi.kategoria}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {format(laptopi.data!, 'dd MMM yyyy h:mm aa')}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='shopping cart' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{laptopi.pershkrimi},<br /> {laptopi.cmimi+"€"}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})