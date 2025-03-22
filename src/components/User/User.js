import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginTop: "5%",
  },
});

function User() {
  const { userId } = useParams();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} avatarId={0} />
      <UserActivity className={classes.activity} />
    </div>
  );
}

export default User;
