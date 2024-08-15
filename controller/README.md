## Follow these steps

### make sure latest LTS version of node is installed.

```
npm install -g create-expo-app
npx create-expo-app --template
```
name the project as applicationName
```
cd controller
npx expo start
```

on your android device download the expo go app and scan the QR code displayed on the terminal.

## Start the web socket server at ws://localhost:8080
```
cd server
node index.js
```
The websocket client must be connected to the computer's IPv4 address: for windows check through ipconfig
