const boardService = require('./board.service.js');
const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service')

// GET LIST
async function getBoards(req, res) {
  try {
    var queryParams = req.query;
    const boards = await boardService.query(queryParams)
    res.json(boards);
  } catch (err) {
    logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

// GET BY ID 
async function getBoardById(req, res) {
  try {
    const boardId = req.params.id;
    console.log('boardId', boardId);
    // console.log('boardId controller', boardId);
    const board = await boardService.getById(boardId)
    // console.log('board controller', board);
    res.json(board)
  } catch (err) {
    logger.error('Failed to get board', err)
    res.status(500).send({ err: 'Failed to get board' })
  }
}

// POST (add board)
async function addBoard(req, res) {
  try {
    const board = req.body;
    // board.byUserId = req.session.user._id
    const addedBoard = await boardService.add(board)
    res.json(addedBoard)
  } catch (err) {
    logger.error('Failed to add board')
    res.status(500).send({ err: 'Failed to add board' })
  }
}

// PUT (Update board)
async function updateBoard(req, res) {
  try {
    const board = req.body;
    const updatedBoard = await boardService.update(board)
    res.json(updatedBoard)
    // console.log('updatedBoard', updatedBoard);
    socketService.broadcast({ type: 'update-board', data: updatedBoard })
    // console.log('updatedBoard', updatedBoard);
    //, userId: review.byUserId 
    // socketService.emitToUser({ type: 'review-about-you', data: review, userId: review.aboutUserId })
    // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })
  } catch (err) {
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })
  }
}

// DELETE (Remove board)
async function removeBoard(req, res) {
  try {
    const boardId = req.params.id;
    const removedId = await boardService.remove(boardId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

module.exports = {
  getBoards,
  getBoardById,
  addBoard,
  updateBoard,
  removeBoard,
}
