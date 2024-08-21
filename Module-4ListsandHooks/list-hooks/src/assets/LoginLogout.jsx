import React,{useState} from "react";

export default function LoginLogout() {
    const [t, sett] = useState(true);
  let content = {
    display: "flex",
    flexDirection: "column",

    padding: "10px",
    width: "300px",
    };

    let nav={
        backgroundColor: "#646cff",
        borderRadius: "10px 10px 0 0 ",
    }
    let main = {
        // height: "200px",
        padding:"80px",
        backgroundColor: "skyblue",
        color: "white",
        fontWeight:"700"
    }
    let footer = {
        // height: "60px",
        backgroundColor: "#646cff",
        borderRadius: "0 0 10px 10px",
        alignItems: "center",
        padding: "20px",
        color: "white",
        fontWeight:"700"
    }
    let x;
    if (t) {
        x = <>
            
        <div className="content" style={content}>
        <div className="nav" style={nav}>
          Navigation
          <button onClick={()=>{sett(false)}}>Login</button>
        </div>
        <div className="main" style={main}>Public Views</div>
        <div className="footer" style={footer}>Footer</div>
      </div></>
    }
    else {
        x = <>
            
        <div className="content" style={content}>
        <div className="nav" style={nav}>
          Navigation
          <button onClick={()=>{sett(true)}}>LogOut</button>
        </div>
        <div className="main" style={main}>Private Views</div>
        <div className="footer" style={footer}>Footer</div>
      </div></>
    }
  return (
    <>
      {x}
    </>
  );
}
