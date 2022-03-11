const WebSocket = require('ws')

const connection = new WebSocket('ws://localhost:8080/')

connection.onopen = () => {
    console.log('WebSocket Client Connected')
}
connection.onerror = error => {
    console.log('Connection Error: ' + error.toString())
}
connection.onmessage = msg => {
    console.log("Received: '", msg.data, "'")
}

function sendNumber() {
    if (connection.readyState == WebSocket.OPEN) {
        var number = Math.round(Math.random() * 0xFFFFFF)
        connection.send(number.toString())
    }
    setTimeout(sendNumber, 1000)
}
sendNumber()