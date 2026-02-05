import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({

  // complaint meta
  category: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "staff"],
    required: true
  },

  // personal info
  personal: {
    name: {
      type: String,
      required: true,
      trim: true
    },

    fatherName: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: String,
      required: true,
      trim: true
    }
  },

  // academic (only for students)
  academic: {
    programme: String,
    batch: String,
    semester: String
  },

  // contact info
  contact: {
    address: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    pincode: {
      type: String,
      required: true
    },

    contactNumber: {
      type: String,
      required: true
    }
  },

  // complaint body
  message: {
    type: String,
    required: true
  },

  // evidence upload
   evidence: {
    type: [String],
    default: []
  },

  // admin lifecycle
  status: {
    type: String,
    enum: ["submitted", "under-review", "resolved"],
    default: "submitted"
  },

  // timestamps
  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Complaint", complaintSchema);
