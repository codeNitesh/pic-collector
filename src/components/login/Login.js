import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ BASEURL, notify }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };
    fetch(BASEURL + "/user/login/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === "400") {
            notify("Invalid credentials.");
          } else if (result.status === "200") {
            localStorage.clear();
            localStorage.setItem("TEMP_TOKEN", result.data.auth_token);
            notify("Logged in successfully.");
            navigate("/app");
          }
        },
        (error) => {
          console.log("error");
          notify("Invalid credentials.");
        }
      );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login Page</h1>

      <input
        type="text"
        placeholder="Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
