const WebSocket = require("ws");
const readlineSync = require("readline-sync");

const connection = new WebSocket("ws://localhost:8080/");

connection.on("open", () => {
    console.log("WebSocket Client Connected");
    ChoiceEntry();
    BroadcastMessage();
});
connection.on("close", () => {
    console.log("Connection lost");
});
connection.on("error", (error) => {
    console.log("Connection Error: " + error.toString());
});
connection.on("message", (data) => {
    var dataJSON = JSON.parse(data);
    console.log("Received: '", dataJSON.msg, "'");
});

function CreateRoom(roomName, roomPwd) {
    if (connection.readyState == WebSocket.OPEN) {
        var topic = "CreateRoom";
        var msg = { topic: topic, name: roomName, pwd: roomPwd };
        connection.send(JSON.stringify(msg));
    }
}

function JoinRoom(roomName, roomPwd) {
    if (connection.readyState == WebSocket.OPEN) {
        var topic = "JoinRoom";
        var msg = { topic: topic, name: roomName, pwd: roomPwd };
        connection.send(JSON.stringify(msg));
    }
}

// entry method to let the client choose between create or join a room
function ChoiceEntry() {
    var choice = readlineSync.question(
        "Choose between create (1) or join (2) a room "
    );
    var roomName = readlineSync.question("Room name: ");
    var roomPwd = readlineSync.question("Password: ");
    if (choice == 1) {
        CreateRoom(roomName, roomPwd);
    } else if (choice == 2) {
        JoinRoom(roomName, roomPwd);
    } else {
        console.error("Invalid choice");
    }
}

function BroadcastMessage() {
    var str = readlineSync.question(
        "Broadcast the following message to all the clients of your room: "
    );
    if (connection.readyState == WebSocket.OPEN) {
        console.log(str);
        var msg = { topic: "BcMsg", BcMsg: str };
        connection.send(JSON.stringify(msg));
    }
    BroadcastMessage();
}

// TODO - clean this method
/*
    function sendNumber() {
        if (connection.readyState == WebSocket.OPEN) {
            var number = Math.round(Math.random() * 0xffffff); //Oxffffff is the color applied to the variable
            connection.send(number.toString());
        }
        setTimeout(sendNumber, 1000);
    }
    sendNumber();
    */