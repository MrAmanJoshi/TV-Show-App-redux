import React, { FC, ChangeEvent, memo, Suspense } from "react";
import { connect, ConnectedProps } from "react-redux";
import LoadingSpinner from "../Components/LoadingSpinner";
import SearchBar from "../Components/SearchBar";
import { castMapSelector } from "../selectors/Cast";
import { loadingSelector, queryMapSelector, showsLoadedSelector } from "../selectors/Show";
import { queryChangeAction } from "../slices/Show";
import { State } from "../Store";

const ShowCard = React.lazy(() => (import("../Components/ShowCard")))

type ShowListPageProps = {} & reduxProps

const ShowListPage: FC<ShowListPageProps> = ({ shows, query, queryChangeAction, loading, cast }) => {

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    queryChangeAction(e.target.value);
  };
  return (
    <div className="mt-2">
      <SearchBar value={query} onChange={handleQueryChange} />
      {loading === true && <div className=" flex mt-2 flex-col items-center">
        <LoadingSpinner className="text-2xl" />
      </div>}
      <div className="flex flex-wrap justify-center">
        <Suspense fallback={<div className="text-center">just a wait...</div>}>
          {
            shows.map((show: any) => {
              return <ShowCard key={show!.id} show={show!} cast={cast[show?.id]} />
            })
          }
        </Suspense>
      </div>
    </div>
  )
}
ShowListPage.defaultProps = {};

const mapStateToProps = (state: State) => ({
  query: queryMapSelector(state),
  shows: showsLoadedSelector(state),
  loading: loadingSelector(state),
  cast: castMapSelector(state)
});

const mapDispatchToProps = {
  queryChangeAction
}

const connecter = connect(mapStateToProps, mapDispatchToProps);

type reduxProps = ConnectedProps<typeof connecter>

export default connecter(memo(ShowListPage));
