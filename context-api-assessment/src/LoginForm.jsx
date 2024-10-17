import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AppContext } from "./App";
// import { useContext } from "react";

const LoginForm = () => {
  const { darkMode, toggleTheme } = React.useContext(AppContext);

  return (
    <div
      className={`d-flex justify-content-center align-items-center min-vh-100 ${
        darkMode ? "bg-dark" : "bg-light"
      }`}
    >
      <div
        className={`card p-4 shadow ${
          darkMode ? "bg-secondary text-light" : "bg-white text-dark"
        }`}
        style={{ width: "300px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="d-inline">Amazing service</h5>
          <button
            className={`btn ${darkMode ? "btn-light" : "btn-dark"} btn-sm`}
            onClick={() => toggleTheme()}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <h3 className="text-center mb-4 bg-info p-2 rounded">Log in</h3>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
            />
          </Form.Group>

          <Button
            variant={darkMode ? "light" : "primary"}
            type="submit"
            className="w-100 mb-3"
          >
            Log in
          </Button>

          <div className="text-center mb-2">OR</div>

          <Button variant={darkMode ? "success" : "success"} className="w-100">
            Create account
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
