const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const boardService = require('./review.service')

async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.query)
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}


async function addBoard(req, res) {
    try {
        var board = req.body
        board.byUserId = req.session.user._id
        board = await boardService.add(board)

        console.log('CTRL SessionId:', req.sessionID);
        //? update user that signed to a task
        //? update user about due date
        // socketService.broadcast({ type: 'board-added', data: board, userId: board.byUserId })
        // socketService.emitToUser({ type: 'review-about-you', data: review, userId: review.aboutUserId })
        // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        res.send(board)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

module.exports = {
    getBoards,
    deleteBoard,
    addBoard
}