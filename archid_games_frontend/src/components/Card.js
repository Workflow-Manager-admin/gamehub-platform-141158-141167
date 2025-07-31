import React from "react";
// PUBLIC_INTERFACE
const Card = ({children, style = {}, ...props}) => (
  <div
    className="card"
    style={{
      background: "#fff",
      border: "1.5px solid #e9ecef",
      borderRadius: "12px",
      boxShadow: "0 2px 18px 0 rgba(30,144,255,0.05)",
      margin: "2.5em auto",
      padding: "2.4em 2em",
      maxWidth: "720px",
      width: "100%",
      ...style
    }}
    {...props}
  >
    {children}
  </div>
);
export default Card;
