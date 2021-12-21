import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import TelefoniFilters from "./TelefoniFilters";
import TelefoniList from "./TelefoniList";
import TelefoniListItemPlaceholder from "./TelefoniListItemPlaceholder";

export default observer(function TelefoniDashboard() {
  const { telefoniStore } = useStore();
  const { loadTelefonat, telefoniRegistry, setPagingParams, pagination } =
    telefoniStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadTelefonat().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (telefoniRegistry.size <= 1) loadTelefonat();
  }, [telefoniRegistry.size, loadTelefonat]);

  return (
    <Grid>
      <Grid.Column width="10">
        {telefoniStore.loadingInitial && !loadingNext ? (
          <>
            <TelefoniListItemPlaceholder/>
            <TelefoniListItemPlaceholder/>
          </>
        ):(
          <InfiniteScroll pageStart={0} loadMore={handleGetNext}
        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages} initialLoad={false}>
          <TelefoniList />
        </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width="6">
        <TelefoniFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext}/>
      </Grid.Column>
    </Grid>
  );
});
