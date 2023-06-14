const eventService = require("../services/event.service")

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
   const body = request.body

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

module.exports = {
   getAll, getDetail, filter
}