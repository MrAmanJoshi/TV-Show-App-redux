import React, { FC, useEffect, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { ShowDetailApiCalled } from "../action/Shows";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import LoadingSpinner from "../Components/LoadingSpinner";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { Person } from "../Models/Shows";
import { castMapSelector } from "../selectors/Cast";
import { showLoadingSelector, showMapSelector } from "../selectors/Show";
import { showLoadingAction } from "../slices/Show";
import { State } from "../Store";

type ShowDetailPageProps = ReduxProps & WithRouterProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({ params,  detail, cast, detailApiCall, loading, loadingAction }) => {

  const imgTemplate = "https://i.postimg.cc/8PCM43NR/missing-image-of-a-person-placeholder.jpg";
 const id = +params.show_id;

  
  useEffect(()=>{
    
  loadingAction()
  detailApiCall(id);
    
  },[]);
  
console.log('detail in page', id, detail, cast[id])
  
  return (
    <div className="mt-2 p-1 ">
    <Link to={"/"} className="text-xl font-sm px-2 py-1 bg-gray-100 border-2 border-gray-200 ">back</Link>
      <h2 className="text-4xl mt-2 font-semibold tracking-wide">{detail?.name}</h2>
      <div className="flex items-center  space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        <>
        {
       ( detail?.genres || [] ).map((n)=>(
        <GenrePill key={n} name={n} />))
        }</>
        <div>
        {loading && <div className="ml-2">
        <LoadingSpinner/>
        </div>}
      </div>
        </div>
      <div className="mt-2 flex">
        <img
          src={detail?.image?.medium || imgTemplate}
          alt="image"
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p dangerouslySetInnerHTML={{__html: detail?.summary || '' }}></p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating: <span className="text-gray-700">{detail?.rating?.average || "0" }</span>
          </p>
        </div>
      </div>

      <div className="mt-2">

        <h4 className="text-2xl font-semibold tracking-wide mt-3">Cast</h4> 
        <div className="sm:grid sm:grid-cols-3 grid grid-cols-2">




          
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: State, ownProps: WithRouterProps)=>{
 
  return {
    detail: showMapSelector(state)[+ownProps.params.show_id],
    cast: castMapSelector(state),
    loading: showLoadingSelector(state)
  }
};
const mapDispatchToProps = {
detailApiCall: ShowDetailApiCalled,
loadingAction: showLoadingAction
} 
const connecter = connect(mapStateToProps, mapDispatchToProps);
  type ReduxProps = ConnectedProps<typeof connecter>
export default withRouter(connecter(memo(ShowDetailPage)));

 // {cast[id].person.map((c: Person)=>{
 //             return <CastCard avatarLink={c.image?.medium||imgTemplate} key={c.id} name={c.name}/>
 //    }) } 