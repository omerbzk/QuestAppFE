import React, { useEffect, useRef, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { makeStyles } from "@mui/styles";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CommentForm from "../Comment/CommentForm";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    margin: "12px auto", 
    width: "90%", 
    maxWidth: "600px",
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
    display: "block", 
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

const theme = createTheme();

function Post(props) {
  const { title, text, userId, userName, postId, likes } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes?.length || 0);
  const [likeId, setLikeId] = useState(null);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;


  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    }
  };

  const refreshComments = useCallback(() => {
    fetch("/v1/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [postId]);

  const saveLike = () => {
    fetch("/v1/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postId: postId,
        userId: localStorage.getItem("currentUser"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLikeId(result.id);
      })
      .catch((error) => console.error("Error:", error));
  };

  const deleteLike = () => {
    fetch("/v1/likes/" + likeId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    })
    .catch((error) => console.error("Error:", error));
  };

  const checkLikes = () => {
    if (likes && likes.length >= 0) {
      var likeControl = likes.find((like => "" + like.userId === localStorage.getItem("currentUser")));
      if (likeControl != null) {
        setLikeId(likeControl.id);
        setIsLiked(true);
      }
    }
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [refreshComments]);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Link className={classes.link} to={{ pathname: "/users/" + userId }}>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
            }
            title={title}
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            { disabled ?
            <IconButton disabled onClick={handleLike} aria-label="add to favorites">
              <FavoriteIcon style={isLiked ? { color: "red" } : null} />
            </IconButton> :
            <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton> }
            {likeCount}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <InsertCommentIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Container fixed className={classes.container}>
              {error
                ? "error"
                : isLoaded
                ? commentList.map((comment) => (
                    <Comment
                      key={comment.id}
                      userId={1}
                      userName={"USER"}
                      text={comment.text}
                    ></Comment>
                  ))
                : "loading"}
                {disabled? "" :
              <CommentForm 
                userId={1}
                userName={"USER"}
                postId={postId}
                refreshComments={refreshComments} 
              />
                }
            </Container>
          </Collapse>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default Post;