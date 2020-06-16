const WebSocket = require("ws");
const crypto = require("crypto");
const server = new WebSocket.Server({ port: 3000 });

const events = {
  CONNECT: "connect",
  NEW_USER: "newUser",
  CONTENT_UPDATE: "codeChange",
  NEW_EDITOR: "newEditor"
};
let users = [];
let editorId = '';
let editorContent = "const a = 10;\nconst b = 5;\n\nfunction sum () {\n\treturn a + b;\n";

function broadcastContent(clientId) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      if (clientId && clientId !== client.id)
      client.send(`{"event": "${events.CONTENT_UPDATE}", "data": ${JSON.stringify(editorContent)}}`);
    }
  });
}

function broadcastNewEditor(clientId) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      editorId = clientId;
      client.send(`{"event": "${events.NEW_EDITOR}", "data": "${editorId}"}`);
    }
  });
}

function broadcastUsersList() {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`{"event": "${events.NEW_USER}", "data": ${JSON.stringify(users)}}`);
    }
  });
}

server.on("connection", ws => {
  ws.id = crypto.randomBytes(16).toString("hex");
  ws.send(`{"event": "${events.CONNECT}", "data": {"id": "${ws.id}", "editor": "${editorId}", "content": ${JSON.stringify(editorContent)}}}`);

  if (users.length != 0) broadcastUsersList();

  if (editorId === '') editorId = ws.id;

  ws.on("message", payload => {
    const message = JSON.parse(payload);
    if (message.event === events.NEW_USER) {
      users.push({ "id": ws.id, "name": message.data });
      broadcastUsersList();
    }

    else if (message.event === events.CONTENT_UPDATE) {
      editorContent = message.data;
      broadcastContent(ws.id);
    }

    else if (message.event === events.NEW_EDITOR) {
      broadcastNewEditor(ws.id);
    }
  });

  ws.on("close", () => {
    users = users.filter(user => user.id !== ws.id);
    broadcastUsersList();
  });
});
