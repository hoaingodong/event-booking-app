const Event = require("../models/event.model")

const getAll = async () => {
    const events = await Event.find({})
    return events
}

const getDetail = async (id) => {
    const event = await Event.findById(id)
    return event
}

const filter = async (body) => {
    let events = await Event.find({})

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
    const events =  await Event.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [Number(latitude), Number(longitude)]},
                distanceField: "distance", // required
                maxDistance: 20,
                includeLocs: "location",
                spherical: true,
                key: 'location'
            }
        }
    ]);

    console.log(events)

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

module.exports = {
    getAll, getDetail, filter, filterLocation, search
}