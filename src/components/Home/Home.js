import React from "react";
import Post from "../Post/Post";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #E0EAF8 0%, #A1C4FD 50%, #C2E9FB 100%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
    color: "black",
  },
}));

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const classes = useStyles();

  const refreshPosts = () => {
    fetch("/v1/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    refreshPosts();
  }, []);

  if (error) {
    return <div>Error!: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.container}>
        <PostForm
            userId={1}
            userName={"John Doe"}
            refreshPosts = {refreshPosts} />
        {postList.map((post) => (
          <Post
            key={post.id}
            likes = {post.postLikes}
            postId={post.id}
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            text={post.text}
          />
        ))}
      </div>
    );
  }
}

export default Home;