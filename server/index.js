const express  = require('express')
const socketio  = require('socket.io')
const http = require('http')
const cors = require('cors')

// custom helper functions
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express();
const http_server = http.createServer(app)
const io = socketio(http_server)

app.use(cors)
app.use(router)

io.on('connection', (client_socket) => {
    client_socket.on('JOIN', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: client_socket.id, name, room })
        if (error) {
            return callback({room_data: error})
        }

        client_socket.emit('MESSAGE', { 
            user: 'Chat.io', 
            text: `Welcome to room '${user.room}', ${user.name}!` 
        })
        client_socket.broadcast.to(user.room).emit('MESSAGE', {
            user: 'Chat.io',
            text: `${user.name} has joined.`
        })

        client_socket.join(user.room)
        io.to(user.room).emit('ROOM_DATA', { 
            room: user.room, 
            users: getUsersInRoom(user.room)
        })

        callback()
    })    


    client_socket.on('SEND_MSG', (message, callback) => {
        const user = getUser(client_socket.id)
        io.to(user.room).emit('MESSAGE', { 
            user: user.name, 
            text: message 
        })

        callback()
    })

    client_socket.on('DISCONNECT', () => {
        const user = removeUser(client_socket.id)
        if (user) {
            io.to(user.room).emit('MESSAGE', { 
                user: 'Chat.io', 
                text: `${user.name} has left` 
            })
            io.to(user.room).emit('ROOM_DATA', { 
                room: user.room, 
                users: getUsersInRoom(user.room)
            })
        }
    })
})

http_server.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))