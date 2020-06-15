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
let editorContent = {
  id: '',
  text: 'const a = 10;\nconst b = 5;\n\nfunction sum () {\n\treturn a + b;\n'
};

function broadcastContent(clientId) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      if (clientId && clientId !== client.id)
      client.send(`{"event": "${events.CONTENT_UPDATE}", "data": ${JSON.stringify(editorContent)}}`);
      console.log(`{"event": "${events.CONTENT_UPDATE}", "data": ${JSON.stringify(editorContent)}}`);
    }
  });
}

function broadcastNewEditor(clientId) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      if (clientId !== client.id)
      client.send(`{"event": "${events.NEW_EDITOR}", "data": "${clientId}"}`);
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
  ws.send(`{"event": "${events.CONNECT}", "data": "${ws.id}"}`);

  if (users.length != 0) broadcastUsersList();

  if (editorContent) broadcastContent();

  if (editorContent.id === '') editorContent.id = ws.id;

  ws.on("message", payload => {
    const message = JSON.parse(payload);
    if (message.event === events.NEW_USER) {
      users.push({ "id": ws.id, "name": message.data });
      broadcastUsersList();
    }

    else if (message.event === events.CONTENT_UPDATE) {
      editorContent = {user: ws.id, text: message.data};
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
