import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Telefoni } from '../../../app/models/telefoni'

interface Props{
    telefoni: Telefoni;
}

export default observer(function TelefoniDetailedSidebar ({telefoni: {telefonatPrezencat, host}}: Props) {
    if(!telefonatPrezencat) return null;
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
                {telefonatPrezencat.length} {telefonatPrezencat.length === 1 ? 'Person eshte' : 'Persona jane'} duke shikuar telefonin
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {telefonatPrezencat.map(telefonatPrezenca =>(
                        <Item style={{ position: 'relative' }} key={telefonatPrezenca.username}>
                            {telefonatPrezenca.username === host?.username &&
                        <Label
                            style={{ position: 'absolute' }}
                            color='orange'
                            ribbon='right'
                        >
                            Host
                        </Label>}
                        <Image size='tiny' src={telefonatPrezenca.image || '/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`/profiles/${telefonatPrezenca.username}`}>{telefonatPrezenca.displayName}</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})