import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  InputAdornment,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    margin: "12px auto", // Ortalayıp alt alta sıralıyoruz
    width: "90%", // Genişliği kontrol altında tut
    maxWidth: "600px", // Kartın maksimum genişliğini belirle
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: "transform 0.3s",
  },
  avatar: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
  container: {
    display: "block", // Flex yerine block kullanarak alt alta diziyoruz
    width: "100%",
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostForm(props) {
  const { userId, userName, refreshPosts } = props;
  const classes = useStyles();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);

  const savePost = () => {
    fetch("/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        title: title,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error));
  };

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={isSent}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Post sent successfully!
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader
          avatar={
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + userId }}
            >
              <Avatar className={classes.avatar} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              id="outlined-adorment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            ></OutlinedInput>
          }
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <OutlinedInput
              id="outlined-adorment-amount"
              multiline
              placeholder="Text"
              inputProps={{ maxLength: 500 }}
              fullWidth
              value={text}
              onChange={(i) => handleText(i.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    style={{
                      background:
                        "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                      color: "white",
                    }}
                    onClick={handleSubmit}
                    endIcon={<SendIcon />}
                  >
                    Post
                  </Button>
                </InputAdornment>
              }
            ></OutlinedInput>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
