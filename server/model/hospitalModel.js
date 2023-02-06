const mongoose = require("mongoose")
const validator = require("validator")


const doctorSchema = new mongoose.Schema({
  doctors: [
    {
      name: {
        type: String,
        required: [true, "must provide doctor name"]
      },
      walletAddress: {
        type: String,
        required: [true, "must provide doctor wallet address"]
      },
      email: {
        type: String,
        required: [true, "please provide doctor email"],
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, "Please provide valid email"]
      },
      image: {
        type: String,
        required: [true, "must provide doctor image"]
      },
      description: {
        type: String,
        required: [true, "must provide doctor description"]
      },
      gender: {
        type: String,
        required: [true, "must provide gender"]
      },
      specialistAt: {
        type: String,
        required: [true, "must provide specialist at"]
      },
      availableTime: {
        type: String,
        required: [true, "must provide available time"]
      }
    }
  ]
})

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide Hospital name"]
  },
  email: {
    type: String,
    required: [true, "please provide hospital email"],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Please provide valid email"]
  },
  image: {
    type: [String],
    required: [true, "must provide Hospital image"]
  },
  location: {
    type: String,
    required: [true, "must provide Location"]
  },
  walletAddress: {
    type: String,
    required: [true, "must provide wallet address"]
  },
  description: {
    type: String,
    required: [true, "must provide Hospital description"]
  },
  telephone: {
    type: [String],
    required: [true, "must provide teliphone number"]
  },
  lat: {
    type: String,
    required: [true, "must provide lat"]
  },
  lng: {
    type: String,
    required: [true, "must provide lng"]
  },
  availableService: {
    medicalProcidure: {
      type: Boolean,
      default: false
    },
    medicalTest: {
      type: Boolean,
      default: false
    },
    medicalTherapy: {
      type: Boolean,
      default: false
    }
  },
  Anesthesia: {
    type: Boolean,
    default: false
  },
  AnesthesiaDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Anesthesia
    }
  },
  Dentistry: {
    type: Boolean,
    default: false
  },
  DentistryDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Dentistry
    }
  },
  Dermatology: {
    type: Boolean,
    default: false
  },
  DermatologyDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Dermatology
    }
  },
  DietNutrition: {
    type: Boolean,
    default: false
  },
  DietNutritionDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.DietNutrition
    }
  },
  Emergency: {
    type: Boolean,
    default: false
  },
  EmergencyDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Emergency
    }
  },
  Gynecologic: {
    type: Boolean,
    default: false
  },
  GynecologicDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Gynecologic
    }
  },
  Neurologic: {
    type: Boolean,
    default: false
  },
  NeurologicDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Neurologic
    }
  },
  Pathology: {
    type: Boolean,
    default: false
  },
  PathologyDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Pathology
    }
  },
  Pediatric: {
    type: Boolean,
    default: false
  },
  PediatricDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Pediatric
    }
  },
  PlasticSurgery: {
    type: Boolean,
    default: false
  },
  PlasticSurgeryDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.PlasticSurgery
    }
  },
  Psychiatric: {
    type: Boolean,
    default: false
  },
  PsychiatricDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Psychiatric
    }
  },
  Renal: {
    type: Boolean,
    default: false
  },
  RenalDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Renal
    }
  },
  Surgical: {
    type: Boolean,
    default: false
  },
  SurgicalDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Surgical
    }
  },
  Toxicologic: {
    type: Boolean,
    default: false
  },
  ToxicologicDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Toxicologic
    }
  },
  Urologic: {
    type: Boolean,
    default: false
  },
  UrologicDoctor: {
    type: doctorSchema,
    validate: function() {
      return this.Urologic
    }
  },
  openingHours: {
    type: String,
    required: [true, "must provide opening hours"]
  }
})

const Hospital = mongoose.model("Hospital", hospitalSchema)

module.exports = Hospital
