const logger = require("./logger")

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
    console.log(error.message)
    console.log(error.name)

    if (error.name === "CastError") {
        return response.status(400).send({error: "malformed id"})
    } else if (error.name === "ValidationError") {
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
    else if (error.message === "Invalid email or password") {
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

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}