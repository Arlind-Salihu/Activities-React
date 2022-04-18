import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityListItemPrezenca from "./ActivityListItemPrezenca";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {

  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && <Label attached="top" color="red" content='Canceled' style={{textAlign: 'center'}}/>}
        <Item.Group>
          <Item>
            <Item.Image style={{marginBottom: 5}} size="tiny" circular src={activity.host?.image || "/assets/user.png"} />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.emri}
              </Item.Header>
              <Item.Description>Hosted by <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label basic color='orange'>
                    You are the Host of this activity
                  </Label>
                </Item.Description>
              )}
              {activity.isInteresed && !activity.isHost && (
                <Item.Description>
                  <Label basic color='green'>
                    You are interesed for this activity
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(activity.data!, 'dd, MMM yyyy h:mm aa')} <br />
          <Icon name="shopping basket" />
          {activity.kategoria} <br />
        </span>
      </Segment>
        <Segment secondary>
          <ActivityListItemPrezenca activitiesPrezencat={activity.activitiesPrezencat!}/>
        </Segment>
      <Segment clearing>
        <span>{activity.pershkrimi}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
}
