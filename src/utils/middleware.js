require("dotenv").config()
const logger = require("./logger")
const { expressjwt: jwt } = require("express-jwt");
const { CustomError } = require('./CustomError');


const requestLogger = (request, response, next) => {
    logger.info("Method: ", request.method)
    logger.info("Path:  ", request.path)
    logger.info("Body:  ", request.body)
    logger.info("---")

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "unknown endpoint"})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    console.log(error.name)

    if (error.name === "CastError") {
        return response.status(400).send({error: "malformed id"})
    }
    else if (error.name === "ValidationError") {
        return response.status(400).json({error: error.message})
    }
    else if (error.message === "No authorization token was found") {
        return response.status(401).json({
            error: "token missing"
        })
    }
    else if (error.message === "jwt expired") {
        return response.status(401).json({
            error: "token expired"
        })
    }
    else if (error.name === "UnauthorizedError") {
        return response.status(401).json({
            error: "invalid token"
        })
    }
    else if (error.message === "Your account has not been activated") {
        return response.status(401).json({
            error: error.message,
            statusCode: 401
        })
    }
    else if (error instanceof CustomError) {
        response.status(error.statusCode).json({ error: error.message });
    }
    else {
        return response.status(502).json({error: "Error Server"})
    }

    next()
}

const authJwt = ()=>{
    return jwt({ secret: process.env.SECRET, algorithms: ["HS256"], requestProperty: "user" })
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    authJwt
}