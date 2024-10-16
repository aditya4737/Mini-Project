
import mongoose from 'mongoose';

// Respondent Schema
const respondentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ['male', 'female'], required: true },
  relation: { type: String, required: true }
});

// Child Schema
const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ['male', 'female'], required: true },
  residingWith: { type: String, required: true }
});

// Incident Schema
const incidentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  place: { type: String, required: true },
  personInvolved: { type: String, required: false }
});

// Types of Violence Schema
const violenceTypeSchema = new mongoose.Schema({
  label: { type: String, required: true },
  checked: { type: Boolean, default: false }
});

// Main Domestic Incident Report Schema
const domesticIncidentReportSchema = new mongoose.Schema({
  complainantName: { type: String, required: true },
  complainantContact: { type: String, required: true },
  respondentDetails: [respondentSchema],
  childrenDetails: [childSchema],
  incidents: [incidentSchema],
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  sexualViolence: {
    type: Map,
    of: Boolean,
    default: {}
  },
  otherSexualAbuse: {
    type: [String],
    default: []
  },
  verbalEmotionalAbuse: {
    type: Map,
    of: Boolean,
    default: {}
  },
  otherVerbalAbuse: {
    type: [String],
    default: []
  },
  economicViolence: {
    type: Map,
    of: Boolean,
    default: {}
  },
  otherEconomicViolence: {
    type: [String],
    default: []
  },
  additionalInfo: {
    type: String,
    default: ""
  }
}, { timestamps: true });

// Export the model
export const DomesticIncidentReport = mongoose.model('DomesticIncidentReport', domesticIncidentReportSchema);


