const WebSocket = require("ws");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const connection = new WebSocket("ws://localhost:8080/");

connection.on("open", () => {
    console.log("WebSocket Client Connected");
    ChoiceEntry();
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

// TODO - entry method to let the client choose between create or join a room
function ChoiceEntry() {
    rl.question(
        "Choose between create (1) or join (2) a room ",
        function(choice) {
            rl.question("Room name: ", function(roomName) {
                rl.question("Password: ", function(roomPwd) {
                    if (choice == 1) {
                        CreateRoom(roomName, roomPwd);
                    } else if (choice == 2) {
                        JoinRoom(roomName, roomPwd);
                    } else {
                        console.error("Invalid choice");
                    }
                });
            });
        }
    );
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