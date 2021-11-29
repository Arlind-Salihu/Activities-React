import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Laptopi } from "../../../app/models/laptopi";

const laptopiImageStyle = {
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
  laptopi: Laptopi;
}

export default observer(function LaptopiDetailedHeader({ laptopi }: Props) {
  return (
    <Segment.Group style={{ width: "75%" }}>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/laptopat/${laptopi.kategoria}.png`}
          fluid
          style={laptopiImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={laptopi.emri}
                  style={{ color: "white" }}
                />
                <p>{format(laptopi.data!, 'dd MMM yyyy')}</p>
                <p>
                  Hosted by <strong>Lindi</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Shiko Laptopin</Button>
        <Button>Injoro Laptopin</Button>
        <Button as={Link} to={`/manageLaptopi/${laptopi.id}`} color="orange" floated="right">
          Menaxho Laptopin
        </Button>
      </Segment>
    </Segment.Group>
  );
});
