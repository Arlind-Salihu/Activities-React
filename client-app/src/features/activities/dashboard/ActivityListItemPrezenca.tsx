import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image, Popup} from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props{
    activitiesPrezencat: Profile[];
}

export default observer(function ActivityListItemPrezenca({activitiesPrezencat}: Props){

    const styles ={
        borderColor: 'orange',
        borderWidth: 3
    }

    return (
        <List horizontal>
            {activitiesPrezencat.map(activitiesPrezenca=>(
                <Popup hoverable key={activitiesPrezenca.username}
                trigger={
                <List.Item key={activitiesPrezenca.username} as={Link} to={`/profiles/${activitiesPrezenca.username}`}>
                    <Image size='mini' circular src={activitiesPrezenca.image || '/assets/user.png'} bordered style={activitiesPrezenca.following ? styles : null}/>
                </List.Item>}>
                    <Popup.Content>
                        <ProfileCard profile={activitiesPrezenca}/>
                    </Popup.Content>
                </Popup>
                
            ))}
        </List>
    )
})
