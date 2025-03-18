import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";

function Auth() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

    const sendRequest = (path) => {
    fetch("/auth/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userName : username, 
        password : password
    }),
    })
      .then((response) => response.json())
      .then(((result) = result))
      .catch((error) => console.log("error", error))
  };

  const handleRegister = () => {
    sendRequest("register");
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    sendRequest("login");
    setUsername("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 400,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        {/* Username */}
        <FormControl fullWidth>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            onChange={(i) => handleUsername(i.target.value)}
          />
        </FormControl>

        {/* Password */}
        <FormControl fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            onChange={(i) => handlePassword(i.target.value)}
          />
        </FormControl>

        {/* Register or Login Button */}
        {isRegistered ? (
          <>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <FormHelperText style={{ margin: 0 }}>
              Don't have an account?{" "}
              <span
                onClick={() => setIsRegistered(false)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Register here
              </span>
            </FormHelperText>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <FormHelperText style={{ margin: 0 }}>
              Are you already registered?{" "}
              <span
                onClick={() => setIsRegistered(true)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Login here
              </span>
            </FormHelperText>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Auth;
