import React from "react";

interface Props {
  data: {
    about: string;
    id: number;
    bannerImage: string;
    name: string;
    avatar: {
      medium: string;
    };
  };
}

const Profile = (props: Props) => {
  return (
    <>
      <p>You are logged in as {props.data.name}</p>
      <img src={props.data.avatar.medium}></img>
    </>
  );
};

export default Profile;
