const mongoose = require('mongoose');

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
  personInvolved: { type: String, required: true }
});

// Types of Violence Schema (Checkbox for different violence categories)
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
  sexualViolence: {
    type: Map,
    of: Boolean, // Map of specific sexual violence fields with checkbox status (true/false)
    default: {}
  },
  otherSexualAbuse: {
    type: [String], // Array for custom 'Other Sexual Abuse' entries
    default: []
  },
  verbalEmotionalAbuse: {
    type: Map,
    of: Boolean, // Map of specific verbal/emotional abuse fields with checkbox status (true/false)
    default: {}
  },
  otherVerbalAbuse: {
    type: [String], // Array for custom 'Other Verbal Abuse' entries
    default: []
  },
  economicViolence: {
    type: Map,
    of: Boolean, // Map of specific economic violence fields with checkbox status (true/false)
    default: {}
  },
  otherEconomicViolence: {
    type: [String], // Array for custom 'Other Economic Violence' entries
    default: []
  },
  additionalInfo: { 
    type: String, // Text field for any other additional information
    default: ""
  }
}, { timestamps: true });

// Create the model
const DomesticIncidentReport = mongoose.model('DomesticIncidentReport', domesticIncidentReportSchema);

module.exports = DomesticIncidentReport;
