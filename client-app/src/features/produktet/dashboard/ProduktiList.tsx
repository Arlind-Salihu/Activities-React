import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ProduktiListItem from "./ProduktiListItem";

export default observer(function ProduktiList() {
  const { produktiStore } = useStore();
  const { groupedProduktet } = produktiStore;

  //style={{marginLeft:"30%", width:"100%"}}
  return (
    <>
      {groupedProduktet.map(([group, produktet]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {produktet.map((produkti) => (
            <ProduktiListItem key={produkti.id} produkti={produkti} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
