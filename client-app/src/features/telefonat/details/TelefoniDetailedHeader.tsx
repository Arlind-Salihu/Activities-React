import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Telefoni } from "../../../app/models/telefoni";

const telefoniImageStyle = {
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
  telefoni: Telefoni;
}

export default observer(function TelefoniDetailedHeader({ telefoni }: Props) {
  return (
    <Segment.Group style={{ width: "75%" }}>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/telefonat/${telefoni.kategoria}.png`}
          fluid
          style={telefoniImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={telefoni.emri}
                  style={{ color: "white" }}
                />
                <p>{format(telefoni.data!, 'dd MMM yyyy')}</p>
                <p>
                  Hosted by <strong>Lindi</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Shiko Telefonin</Button>
        <Button>Injoro Telefonin</Button>
        <Button as={Link} to={`/manage/${telefoni.id}`} color="orange" floated="right">
          Menaxho Telefonin
        </Button>
      </Segment>
    </Segment.Group>
  );
});
