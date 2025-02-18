const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

let sockets = [];
let names = [];
let characters = ['/imagenes/personaje1.png', '/imagenes/personaje2.png']; // Lista de imágenes de personajes disponibles
let nextCharacterIndex = 0; // Índice del próximo personaje a asignar

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  sockets.push(socket);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
    const index = sockets.indexOf(socket);
    if (index !== -1) {
      sockets.splice(index, 1);
      names.splice(index, 1);
    }
  });

  socket.on('newPlayer', (data) => {
    const { name, canvasSize } = data;
    names.push(name);

    // Enviamos la ruta de la imagen y una posición aleatoria
    const character = characters[nextCharacterIndex];
    nextCharacterIndex = (nextCharacterIndex + 1) % characters.length;
    const positionX = Math.floor(Math.random() * canvasSize.width);
    const positionY = Math.floor(Math.random() * canvasSize.height);

    socket.emit('characterData', { character, positionX, positionY });

    // Notificar a todos los clientes sobre el nuevo jugador
    io.emit('updatePlayerList', names);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
