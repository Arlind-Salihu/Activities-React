import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LaptopiListItem from "./LaptopiListItem";

export default observer(function LaptopiList() {
  const { laptopiStore } = useStore();
  const { groupedLaptopat } = laptopiStore;

  //style={{marginLeft:"30%", width:"100%"}}
  return (
    <>
      {groupedLaptopat.map(([group, laptopat]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {laptopat.map((laptopi) => (
            <LaptopiListItem key={laptopi.id} laptopi={laptopi} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
