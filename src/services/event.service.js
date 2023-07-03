const cloudinary = require("cloudinary");
const Event = require("../models/event.model")
const imageService = require("./image.service");

const getAll = async () => {
    const events = await Event.find({}).populate('organizer')
    return events
}

const getDetail = async (id) => {
    const event = await Event.findById(id).populate("organizer")
    return event
}

const filter = async (body) => {
    let events = []

    if (body.longitude && body.latitude) {
        events = await filterLocation(body.longitude, body.latitude)
        events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }

    else {
        events = await Event.find( {startDate: {$gte: Date.now()} })
        events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }

    if (body.topics) {
        events = events.filter(element => element.topics.some(item => body.topics.includes(item)))
    }
    if (body.minPrice) {
        events = events.filter(element => element.price >= body.minPrice)
    }
    if (body.maxPrice) {
        events = events.filter(element => element.price <= body.maxPrice)
    }
    if (body.minDate && body.maxDate) {
        events = events.filter(element => body.minDate <= element.startDate <= body.maxDate )
    }
    if (body.thisDate) {
        console.log(Date.now())
        events = events.filter(element => String(element.startDate).slice(0, 15) === String(body.thisDate).slice(0, 15))
    }

    return events
}

const filterLocation = async (longitude, latitude) => {
    const events = await Event.aggregate(
        [{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(longitude), parseFloat(latitude)]
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

const search = async (body) => {
    let events = await Event.find({})

    const keyword = body.keyword.toLowerCase().replace(/\s+/g, ' ').trim()

    if (keyword) {
        events = await events.filter(element => element.title.toLowerCase().includes(keyword))
    }

    return events
}

const deleteOne = async (id) => {

    const event = await Event.findByIdAndDelete(id)

    return event
}

const createNew = async (event, coordinates) => {

    const savedEvent = await Event.create({...event})

    return savedEvent
}

const update = async (id, body) => {

    const coordinates = []
    coordinates.push(body.longitude)
    coordinates.push(body.latitude)
    const location = {
        type: "Point",
        coordinates: coordinates
    }
    const event = {
        title: body.title,
        topics: body.topics,
        price: body.price,
        introduction: body.introduction,
        startDate: body.startDate,
        endDate: body.endDate,
        address: body.address,
        location: location
    }

    const savedEvent = await Event.findByIdAndUpdate(id, {...event}, {new: true})
    console.log(event)

    return savedEvent
}

const uploadImage = async (event, file) => {

    const image = await imageService.createImage(file)

    event.image = image

    event.save()

    return event
}

const deleteImage = async (image, event) => {

    await cloudinary.uploader
        .destroy(image.id)

    event.image = null
    event.save()

    return event
}

module.exports = {
    getAll, getDetail, filter, filterLocation, search, deleteOne, createNew, update, uploadImage, deleteImage
}