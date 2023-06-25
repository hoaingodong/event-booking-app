const Event = require("../models/event.model")
const imageService = require("./image.service");
const cloudinary = require("cloudinary");

const getAll = async () => {
    const events = await Event.find({}).populate('organizer')
    return events
}

const getDetail = async (id) => {
    const event = await Event.findById(id).populate("organizer")
    return event
}

const filter = async (body) => {
    let events = await Event.find({started_date : { $gt: Date.now()}})

    events.sort((a,b) => new Date(a.started_date).getTime() - new Date(b.started_date).getTime());

    if (body.longitude && body.latitude){
        events = await filterLocation(body.longitude, body.latitude)
    }

    if (body.topics) {
        events = events.filter(element => element.topics.some(item=> body.topics.includes(item)))
    }
    if (body.minPrice) {
        events = events.filter(element => element.price >= body.minPrice)
    }
    if (body.maxPrice) {
        events = events.filter(element => element.price <= body.maxPrice)
    }
    if (body.minDate){
        events = events.filter(element => element.started_date >= body.minDate)
    }
    if (body.maxDate){
        events = events.filter(element => element.started_date >= body.maxDate)
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
                distanceMultiplier: 1/1000,
                key: "location"
            }
        }])

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

    const savedEvent = await Event.create({ ...event})

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
        started_date: body.started_date,
        ended_date: body.ended_date,
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