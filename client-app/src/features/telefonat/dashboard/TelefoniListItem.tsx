import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Telefoni } from "../../../app/models/telefoni";
import TelefoniListItemPrezenca from "./TelefoniListItemPrezenca";

interface Props {
  telefoni: Telefoni;
}

export default function TelefoniListItem({ telefoni }: Props) {

  return (
    <Segment.Group>
      <Segment>
        {telefoni.isCancelled && <Label attached="top" color="red" content='Canceled' style={{textAlign: 'center'}}/>}
        <Item.Group>
          <Item>
            <Item.Image style={{marginBottom: 5}} size="tiny" circular src={telefoni.host?.image || "/assets/user.png"} />
            <Item.Content>
              <Item.Header as={Link} to={`/telefonat/${telefoni.id}`}>
                {telefoni.emri}
              </Item.Header>
              <Item.Description>Hosted by <Link to={`/profiles/${telefoni.hostUsername}`}>{telefoni.host?.displayName}</Link></Item.Description>
              {telefoni.isHost && (
                <Item.Description>
                  <Label basic color='orange'>
                    Ju jeni Host per kete produkt
                  </Label>
                </Item.Description>
              )}
              {telefoni.isInteresed && !telefoni.isHost && (
                <Item.Description>
                  <Label basic color='green'>
                    Ju jeni duke shikuar kete produkt
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
          {format(telefoni.data!, 'dd, MMM yyyy h:mm aa')} <br />
          <Icon name="shopping basket" />
          {telefoni.kategoria} <br />
          <Icon name="euro sign" />
          {telefoni.cmimi}
        </span>
      </Segment>
        <Segment secondary>
          <TelefoniListItemPrezenca telefonatPrezencat={telefoni.telefonatPrezencat!}/>
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
