
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Telefoni} from "../../../app/models/telefoni";

interface Props {
    telefoni: Telefoni
}

export default observer(function TelefoniDetailedInfo({telefoni}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{telefoni.kategoria}</p>
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
              {format(telefoni.data!, 'dd MMM yyyy h:mm aa')}
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
                        <span>{telefoni.pershkrimi},<br /> {telefoni.cmimi+"€"}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})