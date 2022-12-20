const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};
const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};
const broadcastMessage = (wss, ws, data, status, limit = true) => {
  wss.clients.forEach((client) => {
    if (client.box === ws.box || !limit) {
      sendData(data, client);
      console.log(status);
      sendStatus(status, client);
    }
  });
};

export { broadcastMessage };
