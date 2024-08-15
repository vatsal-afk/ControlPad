const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('client connected');

    ws.on('message', function incoming(data) {
        console.log('received: %s', data);
        // var parsedData = JSON.parse(data);
        try{
            var recvd_object = JSON.parse(data);
            console.log(recvd_object);
            console.log(typeof(recvd_object));
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(recvd_object));
                }
            });
        }
        catch(error){
            console.log('error encountered ', error);
        }
        } 
    );

    ws.on("close", function() {
        console.log("client disconnected")
      });
    
    ws.send("you were succesfully connected");
});

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
});
