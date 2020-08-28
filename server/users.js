const users = []

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const user_exists = users.find((user) => user.room === room && user.name === name)

    if (user_exists) {
        return { error: 'Username is taken' }
    }

    const user = { id, name, room }
    users.push(user) 

    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    return index===-1 ? users.splice(index, 1)[0] : null
}

const getUser = (id) => users.find((user) => user.id===id)

const getUsersInRoom = (room) => users.filter((user) => user.room===room)

module.exports ={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}