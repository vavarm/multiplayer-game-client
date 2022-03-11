const WebSocket = require('ws')

const connection = new WebSocket('ws://localhost:8080/')

connection.on('open', () => {
    console.log('WebSocket Client Connected')
    createRoom()
})
connection.on('close', () => {
    console.log("Connection lost")
})
connection.on('error', (error) => {
    console.log('Connection Error: ' + error.toString())
})
connection.on('message', (data) => {
    var dataJSON = JSON.parse(data)
    console.log("Received: '", dataJSON.msg, "'")
})

function createRoom() {
    if (connection.readyState == WebSocket.OPEN) {
        var topic = "CreateRoom"
        var roomName = "MyRoom"
        var roomPwd = "MyPassword"
        var msg = { 'topic': topic, 'name': roomName, 'pwd': roomPwd }
        connection.send(JSON.stringify(msg))
    }
}

function sendNumber() {
    if (connection.readyState == WebSocket.OPEN) {
        var number = Math.round(Math.random() * 0xFFFFFF)
        connection.send(number.toString())
    }
    setTimeout(sendNumber, 1000)
}
sendNumber()