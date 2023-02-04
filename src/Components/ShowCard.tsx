import React, {FC, useState} from "react";
import { Link } from "react-router-dom";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { Person, Shows } from "../Models/Shows";
import Avatar from "./Avatar";

type ShowCardProps = {
  show: Shows,
  cast: {id: number, person: Person[]}
} & WithRouterProps;

const ShowCard:FC<ShowCardProps> =({show, cast}) => {
console.log("show in com", show)
  const [castPop, setCastPop] = useState(false);
  const handleCastPopup = ()=>{
    let  popValue: boolean = false;
    if(castPop === false){
      popValue = true
    }else if(castPop === true){
      popValue = false
    }
    setCastPop(popValue)
  }
 const noImgTemplate = "https://i.postimg.cc/8PCM43NR/missing-image-of-a-person-placeholder.jpg";
  
  const viewCast = cast.person.filter((i: any, index: number)=>{
    return index < 3
  });
  
  return (
<div>
  
 <div className="max-w-xs rounded-md shadow-md p-2 m-1">
    <img
        src={show.image?.medium||noImgTemplate}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{show.name}</h2>
          <p dangerouslySetInnerHTML={{__html: show.summary }}></p>
        </div>
        <div className="flex justify-end">
          {
           castPop === true &&  <div className="h-64 max-w-fit  bg-blue-100 border border-gray-300 overflow-auto">
        {
          cast.person.map((p: Person)=>{
            return <div className="flex items-center">
    <Avatar cast={p}/>    
              <p className="font-medium">{p.name}</p>
            </div>
          })
        }
           </div>
          }
        </div>
        
        <div className="flex justify-center">
          {
            viewCast.map((p)=>(
              <Avatar cast={p} />
            ))
          }
          
            { cast.person.length - viewCast.length !==0 && <button onClick={handleCastPopup} className="rounded-full border border-gray-200 w-10 h-10 font-semibold">+{cast.person.length - viewCast.length }</button> }
        </div>
        <Link
          to={"/show/" + show.id}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md" >
          View Details
        </Link>
      </div>
    </div>
 </div>
  );
}

export default withRouter(ShowCard);
