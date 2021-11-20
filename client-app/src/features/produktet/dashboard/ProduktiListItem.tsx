import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Produkti } from "../../../app/models/produkti";

interface Props {
  produkti: Produkti;
}

export default function ProduktiListItem({ produkti }: Props) {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/produktet/${produkti.id}`}>
                {produkti.emri}
              </Item.Header>
              <Item.Description>Hosted by Lindi</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {produkti.data} <br />
          <Icon name="shopping basket" />
          {produkti.kategoria}
        </span>
      </Segment>
        <Segment secondary>
          Te pranishmit
        </Segment>
      <Segment clearing>
        <span>{produkti.pershkrimi}</span>
        <Button
          as={Link}
          to={`/produktet/${produkti.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
}
