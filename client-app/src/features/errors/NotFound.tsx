import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

export default function NotFound (){
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                Oops - nuk gjetem ate qe po kerkoni!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/produktet' primary>
                    Kthehu tek produktet
                </Button>
            </Segment.Inline>
        </Segment>
    )
}
