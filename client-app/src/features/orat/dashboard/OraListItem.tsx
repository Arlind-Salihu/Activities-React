import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Ora } from "../../../app/models/ora";

interface Props {
  ora: Ora;
}

export default function OraListItem({ ora }: Props) {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/orat/${ora.id}`}>
                {ora.emri}
              </Item.Header>
              <Item.Description>Hosted by Lindi</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(ora.data!, 'dd, MMM yyyy h:mm aa')} <br />
          <Icon name="shopping basket" />
          {ora.kategoria} <br />
          <Icon name="euro sign" />
          {ora.cmimi}
        </span>
      </Segment>
        <Segment secondary>
          Te pranishmit
        </Segment>
      <Segment clearing>
        <span>{ora.pershkrimi}</span>
        <Button
          as={Link}
          to={`/orat/${ora.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
}
