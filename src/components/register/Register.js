import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ BASEURL, notify }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };
    fetch(BASEURL + "/user/register/", {
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
            notify("Error.");
          } else if (result.status === "200") {
            notify("Registration done. Please login now.");
            navigate("/login");
          }
        },
        (error) => {
          console.log("error");
          notify("Error.");
        }
      );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login Page</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br></br>
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

export default Register;
