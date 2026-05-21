import complaintJoiSchema from "../models/joiSchema.js";
import ExpressError from "../utils/ExpressError.js";

/**
 * Middleware to validate complaint data using Joi.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export function validateComplaint(req, res, next) {
    const { error } = complaintJoiSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}
