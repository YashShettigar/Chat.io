const express  = require('express')
const socketio  = require('socket.io')
const http = require('http')

// custom helper functions
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express();
const http_server = http.createServer(app)
const io = socketio(http_server)

io.on('connection', (client_socket) => {
    client_socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: client_socket.id, name, room })
        if (error) {
            return callback({room_data: error})
        }

        client_socket.emit('message', { user: 'Chat.io', text: `Welcome to room ${user.room}, ${user.name}!` })
        client_socket.broadcast.to(user.room).emit('message', {
            user: 'Chat.io',
            text: `${user.name} has joined.`
        })

        client_socket.join(user.room)
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

        client_socket.to(user.room).emit('users', {
            users: getUsersInRoom(user.room)
        })

        callback()
    })    


    client_socket.on('sendMessage', (message, callback) => {
        const user = getUser(client_socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit('roomData', { room: user.room, text: getUsersInRoom(user.room)})

        callback()
    })

    client_socket.on('disconnect', () => {
        const user = removeUser(client_socket.id)
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${useer.name} has left` })
        }
        console.log('User has disconnected!')
    })
})

app.use(router)

http_server.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))