const ObjectId = require('mongodb').ObjectId
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const userService = require('../user/user.service');
// const orderService = require('../order/order.service')

async function query(filterBy) {
// console.log('filterBy',filterBy )
    try {

        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('court')
        let sortBy = filterBy.sortBy
        let sortType = 1
        let courts = await collection.find(criteria).sort({ [sortBy]: sortType }).toArray()
        //If there is a user, it mean that we are asking for his courts only
        // if (filterBy.userId) {
        //     const orders = await orderService.query()
        //     getOrderQty(courts, orders)
        // }
        return courts
    } catch (err) {
        logger.error('Cannot find courts', err)
        throw err
    }
}

function _buildCriteria(filterBy) {

    let criteria = {}

    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' } //'i' for Capitals       
        criteria.$or = [
            {
                title: txtCriteria
            },
            {
                description: txtCriteria
            }
        ]
    }
    if (filterBy.priceMin && filterBy.priceMax < Infinity) {
        criteria.price = ({ $gte: +filterBy.priceMin, $lte: +filterBy.priceMax })
    }

    if (filterBy.category) {
        txtCriteria = { $regex: filterBy.category, $options: 'i' }
        criteria.category = txtCriteria
    }
    if (filterBy.deliveryDate >= 1) {
        criteria.daysToMake = { $lte: +filterBy.deliveryDate }
    }
    if (filterBy.userId) {
        criteria['owner._id'] = { $regex: filterBy.userId }
    }
    return criteria
}

// async function getOrderQty(courts, orders) {

//     try {
//         if (courts.length ) {
            
//             courts.forEach(court => {
//                 court.orderQty = 0
//                 court.orderQty = orders.reduce((acc, order) => acc + ((court._id == order.court._id) ? +1 : 0),0)
//                 return court
//             })               
//             return courts
//         }
//     } catch (err) {
//         logger.error(`While counting courts by seller id and court id `, err)
//         throw err
//     }
// }



async function getById(courtId) {

    try {
        const collection = await dbService.getCollection('court')
        const court = collection.findOne({ _id: ObjectId(courtId) })        
        return court
    } catch (err) {
        logger.error(`While finding court ${courtId}`, err)
        throw err
    }
}

async function remove(courtId) {
    try {
        const collection = await dbService.getCollection('court')
        await collection.deleteOne({ _id: ObjectId(courtId) })
        return courtId
    } catch (err) {
        logger.error(`Cannot remove court ${courtId}`, err)
        throw err
    }
}

async function add(court) {

    try {
        const collection = await dbService.getCollection('court')
        await collection.insertOne(court)
        const user = await userService.updateUserIsSeller(court.owner._id)
        return court
    } catch (err) {
        logger.error('Cannot insert court', err)
        throw err
    }
}


async function edit(court) {
    try {
        const currCourt = court
        // let id = ObjectId(court._id)
        let id = court._id
        delete court._id
        const collection = await dbService.getCollection('court')
        await collection.updateOne({ _id: ObjectId(id) }, { $set: { ...court } })
        return court
    } catch (err) {
        logger.error(`Cannot update court ${courtId}`, err)
        throw err
    }
}

// async function updateCourtRating(court, rating) {
//     try {
//         let id = ObjectId(court._id)
//         const collection = await dbService.getCollection('court')
//         const updatedCourt = await collection.updateOne({ _id: ObjectId(id) }, { $set: { ...court, rating: rating } })
//         return updatedCourt
//     } catch (err) {
//         logger.error('Cannot updare court rating', err)
//         throw err
//     }
// }

module.exports = {
    remove,
    query,
    getById,
    add,
    edit,
    // updateCourtRating,    
    // getOrderQty
}