import React, { useState } from "react";

let logincontainer = {
  width: "300px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: " 5px",
  backgroundColor: "#eee",
};
let close = {
  float: "right",
  cursor: "pointer",
};
let btnlog = {
  backgroundColor: "blue",
  color: "white",
  padding: "10px 20px",
  border: " none",
  borderRadius: " 4px",
  cursor: "pointer",
};

let rememberme = {
  marginBottom: "15px",
  cursor: "pointer",
};
let whole = {
  backgroundColor: "red",
  zIndex: "100",
  position: "absolute",
  top: "200px",
  left: "300px",
};

export default function LogReg() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isModalOpenr, setIsModalOpenr] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsModalOpenr(false);
    document.querySelector(".layer").style.display="block"

  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpenr(true);
    document.querySelector(".layer").style.display="block"
  };

  return (
    <div>
      <div className="container">
        <h1 style={{ margin: "5px", fontFamily: "arial" }}>Modal Login Form</h1>
        <button className="open-modal" onClick={handleOpenModal}>
          Open Modal Login
        </button>
        <Modal
          isOpenl={isModalOpen}
          onClose={handleCloseModal}
          isOpenr={isModalOpenr}
        >
          {/* Modal content here */}
        </Modal>
      </div>
    </div>
  );
}

export function Modal({ isOpenl, onClose, isOpenr }) {
  return (
    <div className="container">
      <h1 style={{ margin: "5px", fontFamily: "arial" }}>
        Modal Register Form
      </h1>
      <button className="open-modal" onClick={onClose} >
        Open Modal Register
      </button>
      <div
        className="layer"
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: "0",
          backgroundColor: "#1b1b1b80",
        }}
      >
        <div className="whole" style={whole}>
          {isOpenr && (
            <div className="logreg" style={logincontainer}>
              <h2>REGISTER FIRST</h2>
              <form>
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required />
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required />
                <label for="email">Email address:</label>
                <input type="email" id="email" name="email" required />
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <div style={rememberme}>
                  <input type="checkbox" id="rememberMe" name="rememberMe" />
                  <label for="rememberMe">Remember Me On This Computer</label>
                </div>
                <button
                  type="submit"
                  style={btnlog}
                  onClick={() =>
                    (document.querySelector(".layer").style.display = "none")
                  }
                >
                  REGISTER
                </button>
              </form>
              <div className="links">
                <a href="#" style={{ listStyle: "none" }}>
                  {" "}
                  got Your Password?
                </a>{" "}
                <br />
                <a href="#" style={{ listStyle: "none" }}>
                  Create A New Account
                </a>
              </div>
            </div>
          )}
          {isOpenl && (
            <div className="logreg" style={logincontainer}>
              <span classNameName="close" onClick={onClose}>
                <div style={close}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </span>
              <h2>LOGIN TO MY ACCOUNT</h2>
              <form>
                <label for="email">Email address:</label>
                <input type="email" id="email" name="email" required />
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <div style={rememberme}>
                  <input type="checkbox" id="rememberMe" name="rememberMe" />
                  <label for="rememberMe">Remember Me On This Computer</label>
                </div>
                <button
                  type="submit"
                  style={btnlog}
                  onClick={() =>
                    (document.querySelector(".layer").style.display = "none")
                  }
                >
                  LOGIN
                </button>
              </form>
              <div className="links">
                <a href="#" style={{ listStyle: "none" }}>
                  Forgot Your Password?
                </a>{" "}
                <br />
                <a href="#" style={{ listStyle: "none" }}>
                  Create A New Account
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
