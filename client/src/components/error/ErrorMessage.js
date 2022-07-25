import React from "react";

const ErrorMessage = ({ children }) => {
  return (
    <div>
      <p
        style={{
          fontSize: "12px",
          textAlign: "center",
          marginTop: "2%",
          fontWeight: "500",
          color: "red",
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default ErrorMessage;
