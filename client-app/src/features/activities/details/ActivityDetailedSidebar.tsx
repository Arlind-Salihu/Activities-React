import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../app/models/activity'

interface Props{
    activity: Activity;
}

export default observer(function ActivityDetailedSidebar ({activity: {activitiesPrezencat, host}}: Props) {
    if(!activitiesPrezencat) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {activitiesPrezencat.length} {activitiesPrezencat.length === 1 ? 'Person is' : 'Persons are'} interesed for this activity!
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {activitiesPrezencat.map(activitiesPrezenca =>(
                        <Item style={{ position: 'relative' }} key={activitiesPrezenca.username}>
                            {activitiesPrezenca.username === host?.username &&
                        <Label
                            style={{ position: 'absolute' }}
                            color='orange'
                            ribbon='right'
                        >
                            Host
                        </Label>}
                        <Image size='tiny' src={activitiesPrezenca.image || '/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`/profiles/${activitiesPrezenca.username}`}>{activitiesPrezenca.displayName}</Link>
                            </Item.Header>
                            {activitiesPrezenca.following &&
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}
                        </Item.Content>
                    </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})