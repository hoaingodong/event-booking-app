const cloudinary = require("cloudinary");
const Event = require("../models/event.model")
const imageService = require("./image.service");
const {CustomError} = require("../utils/CustomError");

const getAll = async () => {
    const events = await Event.find({}).populate('organizer')

    return events
}

const getDetail = async (id) => {
    const event = await Event.findById(id)

    return event
}

const filter = async (body) => {
    let events = []

    if (body.longitude && body.latitude) {
        events = await filterLocation(body.longitude, body.latitude)
        events = events.filter(element => (element.startDate >= Date.now()))
    }

    else {
        if (body.page && body.perPage) {
            events = await Event.find( {startDate: {$gte: Date.now()} }).limit(body.perPage).skip(body.perPage * body.page)
        }
        else {
            events = await Event.find( {startDate: {$gte: Date.now()} })
        }

    }

    events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    if (body.topics) {
        events = events.filter(element => element.topics.some(item => body.topics.includes(item)))
    }
    if (body.minPrice) {
        events = events.filter(element => element.price >= body.minPrice)
    }
    if (body.maxPrice) {
        events = events.filter(element => element.price <= body.maxPrice)
    }
    if (body.minDate){
        events = events.filter(element => element.startDate >= body.minDate)
    }
    if (body.maxDate){
        events = events.filter(element => element.endDate <= body.maxDate)
    }
    if (body.thisDate) {
        console.log(Date.now())
        events = events.filter(element => String(element.startDate).slice(0, 15) === String(body.thisDate).slice(0, 15))
    }
    if (body.keyword) {
        const keyword = body.keyword.toLowerCase().replace(/\s+/g, ' ').trim()
        events = events.filter(element => element.title.toLowerCase().includes(keyword))
    }

    return events
}

const filterLocation = async (longitude, latitude) => {
    const events = await Event.aggregate(
        [{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: {longitude: parseFloat(longitude), latitude: parseFloat(latitude)}
                },

                maxDistance: 10 * 1000,
                distanceField: 'distance',
                distanceMultiplier: 1 / 1000,
                key: "location"
            }
        }])

    events.map(event => {
        event['id'] = event['_id']
        delete event['_id']
        delete event['__v']
    })

    return events
}

const deleteOne = async (id) => {

    const event = await Event.findByIdAndDelete(id)

    return event
}

const createNew = async (event) => {

    const savedEvent = await Event.create({...event})

    return savedEvent
}

const update = async (id, body) => {

    const event = {
        title: body.title,
        topics: body.topics,
        price: body.price,
        introduction: body.introduction,
        startDate: body.startDate,
        endDate: body.endDate,
        address: body.address,
        location: body.location
    }

    const savedEvent = await Event.findByIdAndUpdate(id, {...event}, {new: true})

    return savedEvent
}

const uploadImage = async (event, file) => {

    const image = await imageService.createImage(file)

    event.image = image

    event.save()

    return event
}

const deleteImage = async (image, event) => {

    const result = await cloudinary.uploader
        .destroy(image.id)
    if (result.result == "not found") {
        throw new CustomError("Can not delete event's image", 400)
    }

    event.image = null
    event.save()

    return event
}

module.exports = {
    getAll, getDetail, filter, filterLocation, deleteOne, createNew, update, uploadImage, deleteImage
}