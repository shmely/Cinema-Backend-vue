
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('disconnect', () => {
        })

        socket.on('board updated', () => {
            socket.broadcast.to(socket.currBoard).emit('board updated')
        })
        socket.on('open board socket', boardId => {
            if (socket.currBoard) {
                socket.leave(socket.currBoard)
            }
            socket.join(boardId)
            socket.currBoard = boardId;
        })
    })
}