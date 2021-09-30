const User = require('../models/user')

const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// checks if user is authentificated or not

exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {

    const { token } = req.cookies

    if(!token) {
        return next(new ErrorHandler('connectez-vous dabord pour accéder à cette ressource', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

//Handling users roles
exports.authorizeRoles = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(
            new ErrorHandler(`Ce Role (${req.user.role})  ne permet pas d'accéder à ce ressource`,
            403))
        }
        next()
    }
}
