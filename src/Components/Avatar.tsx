import { FC } from "react";
import { Person } from "../Models/Shows";

type AvatarProps = { cast: Person };

const Avatar: FC<AvatarProps> = ({ cast }) => {
  return (
    <div>
      <img src={cast.image?.medium || "https://i.postimg.cc/8PCM43NR/missing-image-of-a-person-placeholder.jpg"} className="rounded-full border border-gray-200 w-10 h-10 " />
    </div>
  )
};
export default Avatar;