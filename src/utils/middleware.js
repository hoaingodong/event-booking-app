const logger = require("./logger")
const jwt = require("jsonwebtoken")
// const User = require("../models/user.model")

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

    if (error.name === "CastError") {
        return response.status(400).send({error: "malformed id"})
    } else if (error.name === "ValidationError") {
        return response.status(400).json({error: error.message})
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({
            error: "invalid token"
        })
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({
            error: "token expired"
        })
    }
    else if (error.message === "You haven't registered with this email") {
        return response.status(404).json({
            error: error.message
        })
    }
    else if (error.message === "Wrong OTP or OTP was expired") {
        return response.status(401).json({
            error: error.message
        })
    }
    else if (error.message === "Invalid username or password") {
        return response.status(401).json({
            error: error.message
        })
    }
    else if (error.message === "Account already activated") {
        return response.status(401).json({
            error: error.message
        })
    }
    else if (error.message === "Your account has not been activated") {
        return response.status(401).json({
            error: error.message
        })
    }
    else if (error.message === "User not found") {
        return response.status(404).json({
            error: error.message
        })
    }
    else if (error.message === "Event not found") {
        return response.status(404).json({
            error: error.message
        })
    }
    else if (error.message === "Delete Image unsuccessfully!") {
        return response.status(404).json({
            error: error.message
        })
    }
    else if (error.message === "Can not delete your avatar!") {
        return response.status(404).json({
            error: error.message
        })
    }
    else {
        return response.status(502).json({error: "Error Server"})
    }

    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization")

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request["token"] = authorization.substring(7)
    }
    logger.info(request["token"])

    next()
}

const tokenValidator = (request, response, next) => {
    const token = request.token
    if (!token) {
        return response.status(401).json({error: "token missing"})
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: "invalid token"})
    }

    next()
}

// const userExtractor = async (request, response, next) => {
//     const token = request.token
//     const decodedToken = jwt.verify(token, process.env.SECRET)
//     const user = await User.findById(decodedToken.id)
//     if (!user){
//         return response.status(401).json({error: "Unauthorized"})
//     }
//     request["user"] = user
//
//     next()
// }

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    tokenValidator,
    // userExtractor,
}