import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

const activityImageStyle = {
  filter: "brightness(60%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const {activityStore: {updatePrezencen, loading, cancelActivityToggle}} = useStore();
  return (
    <Segment.Group style={{ width: "75%" }}>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {activity.isCancelled &&
          <Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}}
            ribbon color='red' content='Cancelled'/>
        }
        <Image
          src={`/assets/activities/${activity.kategoria}.png`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.emri}
                  style={{ color: "white" }}
                />
                <p>{format(activity.data!, "dd MMM yyyy")}</p>
                <p>
                  Hosted by <strong><Link to={`/pofiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
          <Button color={activity.isCancelled ? 'green' : 'red'} floated="left"
            basic content={activity.isCancelled ? 'Re-Activate' : 'Cancel'}
            onClick={cancelActivityToggle} loading={loading}/>
          <Button
            disabled={activity.isCancelled}
            as={Link}
            to={`/manage/${activity.id}`}
            color="orange"
            floated="right"
          >
            Manage Activity
          </Button>
          </>
        ) : activity.isInteresed ? (
          <Button loading={loading} onClick={updatePrezencen}>I am not Interesed</Button>
        ) : (
          <Button disabled={activity.isCancelled} loading={loading}
            onClick={updatePrezencen} color="teal">I am Interesed
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
