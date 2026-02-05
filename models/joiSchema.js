import Joi from "joi";

const complaintJoiSchema = Joi.object({

  // meta
  category: Joi.string().trim().required(),

  role: Joi.string()
    .valid("student", "staff")
    .required(),

  // personal
  personal: Joi.object({

    name: Joi.string().trim().required(),

    fatherName: Joi.string().trim().required(),

    department: Joi.string().trim().required()

  }).required(),

  // academic (optional)
  academic: Joi.object({

    programme: Joi.string().allow("", null),

    batch: Joi.string().allow("", null),

    semester: Joi.string().allow("", null)

  }).optional(),

  // contact
  contact: Joi.object({

    address: Joi.string().required(),

    state: Joi.string().required(),

    city: Joi.string().required(),

    pincode: Joi.string().required(),

    contactNumber: Joi.string().required()

  }).required(),

  // complaint text
  message: Joi.string().trim().required(),

  // evidence URLs
  evidence: Joi.array()
    .items(Joi.string().uri())
    .default([]),

  // status (optional, backend controlled)
  status: Joi.string()
    .valid("submitted", "under-review", "resolved")
    .default("submitted"),

  createdAt: Joi.date().optional()

});


export default complaintJoiSchema;