import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Produkti} from "../../../app/models/produkti";

const produktiImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    produkti: Produkti
}

export default observer (function ProduktiDetailedHeader({produkti}: Props) {
    return (
        <Segment.Group style={{width:"65%"}}>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${produkti.kategoria}.png`} fluid style={produktiImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={produkti.emri}
                                    style={{color: 'white'}}
                                />
                                <p>{produkti.data}</p>
                                <p>
                                    Hosted by <strong>Lindi</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
            <Button color='orange' floated='right'>
                    Menaxho Produktin
                </Button>
                <Button color='teal'>Shiko Produktin</Button>
                <Button>Injoro Produktin</Button>
            </Segment>
        </Segment.Group>
    )
})