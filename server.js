const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uuid = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/',(req,res) => res.redirect(`/${uuid.v4()}`))

app.get('/:id',(req,res) => res.render('room',{RoomId : req.params.id}))


io.on('connection', socket =>{
    socket.on('join-room', (roomId,userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Running on ${PORT}`))