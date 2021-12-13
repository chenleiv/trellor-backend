const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
// filterBy
async function query() {
    try {
        // const criteria = _buildCriteria(filterBy)
        // console.log('criteria', criteria);
        // console.log('filterBy', filterBy);
        // const criteria = {}
        const collection = await dbService.getCollection('board')
        var boards = await collection.find().toArray()
        //.find(criteria)
        // console.log('boards service', boards);
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ '_id': ObjectId(boardId) })
        // console.log('board getById service', board);
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        const addedBoard = await collection.insertOne(board)
        const id = addedBoard.insertedId
        board._id = id
        return board
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    try {
        var id = ObjectId(board._id)
        delete board._id
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ "_id": id }, { $set: { ...board } })
        return board
    } catch (err) {
        logger.error(`cannot update board ${board}`, err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.title) {
//         const regex = new RegExp(filterBy.title, 'i')
//         const txtCriteria = { $regex: regex }
//         criteria.title = txtCriteria
//     }
//     if (filterBy.members !== '' && filterBy !== undefined) {
//         criteria.members = { $eq: JSON.parse(filterBy.members) }
//         console.log('criteria.members', criteria.members);
//         console.log('filterBy.members', filterBy.members);
//     }
//     if (filterBy.labels) {
//         if (filterBy.labels.length) {
//             criteria.labels = { $in: filterBy.labels }
//         }
//     }
//     return criteria
// }

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}


// async function remove(boardId) {
//     try {
//         const store = asyncLocalStorage.getStore()
//         const { userId, isAdmin } = store
//         const collection = await dbService.getCollection('board')
//         // remove only if user is owner/admin
//         const criteria = { _id: ObjectId(boardId) }
//         if (!isAdmin) criteria.byUserId = ObjectId(userId)
//         await collection.deleteOne(criteria)
//     } catch (err) {
//         logger.error(`cannot remove board ${boardId}`, err)
//         throw err
//     }
// }

// async function add(board) {
//     try {
//         // peek only updatable fields!
//         const boardToAdd = {
//             byUserId: ObjectId(review.byUserId),
//             aboutUserId: ObjectId(board.aboutUserId),
//             name: board.name,
//             labels: board.labels
//         }
//         const collection = await dbService.getCollection('board')
//         await collection.insertOne(boardToAdd)
//         return boardToAdd;
//     } catch (err) {
//         logger.error('cannot insert board', err)
//         throw err
//     }
// }