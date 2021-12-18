import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image, Popup} from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props{
    telefonatPrezencat: Profile[];
}

export default observer(function TelefoniListItemPrezenca({telefonatPrezencat}: Props){

    const styles ={
        borderColor: 'orange',
        borderWidth: 3
    }

    return (
        <List horizontal>
            {telefonatPrezencat.map(telefonatPrezenca=>(
                <Popup hoverable key={telefonatPrezenca.username}
                trigger={
                <List.Item key={telefonatPrezenca.username} as={Link} to={`/profiles/${telefonatPrezenca.username}`}>
                    <Image size='mini' circular src={telefonatPrezenca.image || '/assets/user.png'} bordered style={telefonatPrezenca.following ? styles : null}/>
                </List.Item>}>
                    <Popup.Content>
                        <ProfileCard profile={telefonatPrezenca}/>
                    </Popup.Content>
                </Popup>
                
            ))}
        </List>
    )
})
