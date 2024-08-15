## Gyro controlled Racing Game

### make sure latest LTS version of node is installed.
### Follow these steps after cloning the repo : 

```
cd controller
npm install
npx expo start
```

in another terminal window

```
cd server
npm install
node server.js  // this will start the server at localhost:8080
```

on your android device download the expo go app and scan the QR code displayed on the terminal.

The websocket client must be connected to the computer's IPv4 address: for windows check through ipconfig
Enter the IPv4 address in the dialog box displayed on the homescreen of the app.
