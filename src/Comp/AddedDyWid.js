import React from "react";
import Stat from "../stat";
import AppBar from "./AppBar";
import io from "socket.io-client";

function AddedDyWid() {
  const sio = io.connect("http://150.0.0.70:3005");
  return (
    <>
      <AppBar />
      <Stat />
    </>
  );
}

export default AddedDyWid;
