import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Ora } from "../../../app/models/ora";

const oraImageStyle = {
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
  ora: Ora;
}

export default observer(function OraDetailedHeader({ ora }: Props) {
  return (
    <Segment.Group style={{ width: "75%" }}>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/orat/${ora.kategoria}.png`}
          fluid
          style={oraImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={ora.emri}
                  style={{ color: "white" }}
                />
                <p>{format(ora.data!, 'dd MMM yyyy')}</p>
                <p>
                  Hosted by <strong>Lindi</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Shiko Oren</Button>
        <Button>Injoro Oren</Button>
        <Button as={Link} to={`/manageOra/${ora.id}`} color="orange" floated="right">
          Menaxho Oren
        </Button>
      </Segment>
    </Segment.Group>
  );
});
