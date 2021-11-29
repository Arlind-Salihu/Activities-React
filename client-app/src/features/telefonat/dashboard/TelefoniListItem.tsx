import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Telefoni } from "../../../app/models/telefoni";

interface Props {
  telefoni: Telefoni;
}

export default function TelefoniListItem({ telefoni }: Props) {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/telefonat/${telefoni.id}`}>
                {telefoni.emri}
              </Item.Header>
              <Item.Description>Hosted by Lindi</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(telefoni.data!, 'dd, MMM yyyy h:mm aa')} <br />
          <Icon name="shopping basket" />
          {telefoni.kategoria}
        </span>
      </Segment>
        <Segment secondary>
          Te pranishmit
        </Segment>
      <Segment clearing>
        <span>{telefoni.pershkrimi}</span>
        <Button
          as={Link}
          to={`/telefonat/${telefoni.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
}
