const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
let x = 0;
const num = () => {
  // x = Math.random() * 100;
  // return x.toFixed(2);
  return [
    {
      id: 1,
      ticker: "US",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 2,
      ticker: "IN",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 3,
      ticker: "FR",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 4,
      ticker: "MH",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 5,
      ticker: "GJ",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 6,
      ticker: "UP",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 7,
      ticker: "MP",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 8,
      ticker: "EU",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 9,
      ticker: "AU",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 10,
      ticker: "TN",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 11,
      ticker: "NZ",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
    {
      id: 12,
      ticker: "HR",
      Change: Math.random() * 100 - 50,
      Net: Math.random() * 100 - 50,
    },
  ];
};

// const chart = () => {
//   let y = [];
//   for (let i = 1; i < 10; i++) {
//     y.push({
//       x: new Date("2012-04-" + i),
//       open: Math.random() * 5,
//       high: Math.random() * 5,
//       low: Math.random() * 5,
//       close: Math.random() * 5,
//       volume: Math.random() * 10000,
//     });
//   }
//   return y;
// };
let j = -1;
let value = 0;
const line = () => {
  var today = new Date();

  // let y = [];
  // for (i = j; i < 10000; i++) {
  // y.push({
  //   x: i,
  //   y: Math.random() * 100,
  // });
  if (Math.random() > 0.5) {
    value += Math.random() * 2.5;
  } else {
    value -= Math.random() * 2.5;
  }
  j++;

  return { x: new Date(2023, 1, 2, 0, j), y: value.toFixed(2) };
  // }
};

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("sendServer", (data) => {
    console.log("connect id", socket.id);
    setInterval(() => {
      socket.emit("fromServer", num());
    }, 2000);
  });
  socket.on("disconnect", (data) => {
    console.log("Socket disconnect", socket.id);
  });
});

io.on("connection", (socket) => {
  socket.on("sendChart", (data) => {
    console.log(data);
    setInterval(() => {
      socket.emit("fromChart", line());
    }, 1000);
  });
});

server.listen(3005, () => {
  console.log("SERVER IS RUNNING");
});
