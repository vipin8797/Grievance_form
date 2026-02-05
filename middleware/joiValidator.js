import  complaintJoiSchema  from "../models/joiSchema.js";



export function validateComplaint(req, res, next) {

  const { error } = complaintJoiSchema.validate(req.body);

  if (error)
    return res.status(400).send(error.details[0].message);

  next();
}
