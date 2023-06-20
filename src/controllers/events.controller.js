const eventService = require("../services/event.service")
const imageService = require("../services/image.service");
const User = require("../models/user.model");

const getAll = async (request, response, next) => {
   try {
      const events = await eventService.getAll()
      response.status(200).json(events)
   } catch (exception) {
      next(exception)
   }
}

const getDetail = async (request, response, next) => {
   const id = request.params.id

   try {
      const event = await eventService.getDetail(id)
      if (event) {
         response.status(200).json(event)
      } else {
         return response.status(404).json({error: "Event not found"})
      }
   }

   catch(exception) {
      next(exception)
   }
}

const filter = async (request, response, next) => {
   const body = request.query

   try {
      const events = await eventService.filter(body)
      if (events) {
         response.status(200).json(events)
      } else {
         return response.status(404).json({error: "Event not found"})
      }
   }

   catch(exception) {
      next(exception)
   }
}

const filterLocation = async (request, response, next) => {
   const body = request.query
   const longitude = parseFloat(body.longitude)
   const latitude = parseFloat(body.latitude)
   try {
      const events = await eventService.filterLocation(longitude, latitude)
      if (events) {
         response.status(200).json(events)
      } else {
         return response.status(404).json({error: "Event not found"})
      }
   }

   catch(exception) {
      next(exception)
   }
}

const search = async (request, response, next) => {
   const body = request.query

   try {
      const events = await eventService.search(body)
      if (events) {
         response.status(200).json(events)
      } else {
         return response.status(404).json({error: "Event not found"})
      }
   }

   catch(exception) {
      next(exception)
   }
}

const deleteOne = async (request, response, next) => {
   const id = request.params.id
   try {
      await eventService.deleteOne(id)
      response.status(204).json()
   }
   catch(exception) {
      next(exception)
   }
}

const createNew = async (request, response, next) => {
   const body = request.body
   try {
   const file = request.files[0]
   const image = await imageService.createImage(file)

   const event = {
      title: body.title,
      topics: body.topics,
      price: body.price,
      introduction: body.introduction,
      image: image,
      started_date: body.started_date,
      ended_date: body.ended_date,
      organizer: body.user_id
   }

   const user = await User.findById(body.user_id)
   if (!user) {
      response.status(401).json({error: "Invalid user"})
   }

   try {
      const savedEvent = await eventService.createNew(event)
      response.status(201).json(savedEvent)
   }
   catch(exception) {
      next(exception)
   }}
   catch(exception) {
      next(exception)
   }
   }

module.exports = {
   getAll, getDetail, filter, filterLocation, search, deleteOne, createNew
}