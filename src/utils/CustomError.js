class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
    }
}

// Export the custom error classes
module.exports = { CustomError }
