import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Laptopi } from "../../../app/models/laptopi";

interface Props {
  laptopi: Laptopi;
}

export default function LaptopiListItem({ laptopi }: Props) {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/laptopat/${laptopi.id}`}>
                {laptopi.emri}
              </Item.Header>
              <Item.Description>Hosted by Lindi</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(laptopi.data!, 'dd, MMM yyyy h:mm aa')} <br />
          <Icon name="shopping basket" />
          {laptopi.kategoria}
        </span>
      </Segment>
        <Segment secondary>
          Te pranishmit
        </Segment>
      <Segment clearing>
        <span>{laptopi.pershkrimi}</span>
        <Button
          as={Link}
          to={`/laptopat/${laptopi.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
}
