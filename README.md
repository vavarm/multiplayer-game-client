# websocket-chat-client

A node.js software that communicates with a chat server using WebSockets.

> **Note:** This program is a draft and will serve as a basis for more complete programs with graphical interfaces.
It has been developed only to test the websocket server.

# Require

A websocket chat server with a room system.
Refer to the "websocket-chat-server" repository (https://github.com/vavarm/websocket-chat-server)

# Includes

npm modules:
|Name            |Description                     |Link                                       |
|----------------|--------------------------------|-------------------------------------------|
|ws              |WebSocket Library               |https://www.npmjs.com/package/ws           |
|readline-Sync   |Interactive readline in terminal|https://www.npmjs.com/package/readline-sync|

# Graph

```mermaid
graph LR
A((Client 1: id)) -- Client/Server connection --> S{Server: adress, port}
B((Client 2: id)) -- Client/Server connection --> S
C((Client 3: id)) -- Client/Server connection --> S
A -- Client creates a room --> Y[Room 1: name, password]
B -- Client joins a room --> Y
C -- Client creates a room --> Z[Room 2: name, password]
S -- Server's room --> Y
S -- Server's room --> Z
```
