import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";

const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

function CommentForm(props) {
  const { userId, userName, postId } = props;
  const [text, setText] = React.useState("");
  const classes = useStyles();

  const saveComment = () => {
    fetch("/v1/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        text: text,
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error));
  };

  const handleSubmit = () => {
    saveComment();
    setText("");
  };

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        onChange={(e) => handleChange(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + userId }}
            >
              <Avatar className={classes.small} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                color: "white",
              }}
              onClick={handleSubmit}
              endIcon={<SendIcon />}
            >
              Comment
            </Button>
          </InputAdornment>
        }
        value={text}
        style={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}

export default CommentForm;
