import { ObjectId } from 'mongodb'
import { dbService } from '../../../../../services/dbService' 
import { userService } from '../../../../../services/userService'

async function query(filterBy) {
// console.log('filterBy',filterBy )
    try {

        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('reservation')
        let sortBy = filterBy.sortBy
        let sortType = 1
        let reservations = await collection.find(criteria).sort({ [sortBy]: sortType }).toArray()
        //If there is a user, it mean that we are asking for his reservations only
        // if (filterBy.userId) {
        //     const orders = await orderService.query()
        //     getOrderQty(reservations, orders)
        // }
        return reservations
    } catch (err) {
        console.error('Cannot find reservations', err)
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

// async function getOrderQty(reservations, orders) {

//     try {
//         if (reservations.length ) {
            
//             reservations.forEach(reservation => {
//                 reservation.orderQty = 0
//                 reservation.orderQty = orders.reduce((acc, order) => acc + ((reservation._id == order.reservation._id) ? +1 : 0),0)
//                 return reservation
//             })               
//             return reservations
//         }
//     } catch (err) {
//         console.error(`While counting reservations by seller id and reservation id `, err)
//         throw err
//     }
// }



async function getById(reservationId) {

    try {
        const collection = await dbService.getCollection('reservation')
        const reservation = collection.findOne({ _id: ObjectId(reservationId) })        
        return reservation
    } catch (err) {
        console.error(`While finding reservation ${reservationId}`, err)
        throw err
    }
}

async function remove(reservationId) {
    try {
        const collection = await dbService.getCollection('reservation')
        await collection.deleteOne({ _id: ObjectId(reservationId) })
        return reservationId
    } catch (err) {
        console.error(`Cannot remove reservation ${reservationId}`, err)
        throw err
    }
}

async function add(reservation) {

    try {
        const collection = await dbService.getCollection('reservation')
        await collection.insertOne(reservation)
        const user = await userService.updateUserIsSeller(reservation.owner._id)
        return reservation
    } catch (err) {
        console.error('Cannot insert reservation', err)
        throw err
    }
}


async function edit(reservation) {
    try {
        const currReservation = reservation
        // let id = ObjectId(reservation._id)
        let id = reservation._id
        delete reservation._id
        const collection = await dbService.getCollection('reservation')
        await collection.updateOne({ _id: ObjectId(id) }, { $set: { ...reservation } })
        return reservation
    } catch (err) {
        console.error(`Cannot update reservation ${reservationId}`, err)
        throw err
    }
}


module.exports = {
    remove,
    query,
    getById,
    add,
    edit,
}