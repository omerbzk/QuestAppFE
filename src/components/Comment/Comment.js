import React from 'react';
import { makeStyles } from "@mui/styles";
import { CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
    comment : {
        display: "flex",
        flexWrap: "wrap",
        justifyContent : "flex-start",
        alignItems : "center",
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    link: {
        textDecoration: 'none',
        boxShadow: 'none',
        color: 'white',
    },
}));

function Comment(props) {
  const { text, userId, userName } = props;
  const classes = useStyles();

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
      disabled
      id="outlined-adornment-amount"
      multiline
      inputProps={{ maxLength: 25 }}
      fullWidth
      value={text}
      startAdornment={
        <InputAdornment position="start">
            <Link className={classes.link} to={{ pathname: "/users/" + userId }}>
            <Avatar className={classes.small} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
            </Avatar>
            </Link>
        </InputAdornment>
      }
      style={{ color : "black", backgroundColor : 'white' }}
      ></OutlinedInput>
    </CardContent>
  );
}

export default Comment;