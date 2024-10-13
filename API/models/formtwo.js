// import mongoose from 'mongoose';

// // Respondent Schema





// // Main FormTwo Schema
// const FormTwoSchema = new mongoose.Schema({
  
 
  
  
  
//   sexualViolence: {
//     type: Map,
//     of: Boolean,
//     default: {
//       forcedIntercourse: false,
//       forcedPornography: false,
//       forcedEntertainment: false,
//     }
//   },
//   otherSexualAbuse: {
//     type: [String],
//     default: []
//   },
//   verbalEmotionalAbuse: {
//     type: [String],
//     of: Boolean,
//     default: {
//       accusation: false,
//       insultDowry: false,
//       insultNoMaleChild: false,
//       insultNoChild: false,
//       demeaningRemarks: false,
//       ridicule: false,
//       nameCalling: false,
//       forcingNotAttendSchool: false,
//       preventingJob: false,
//       preventingLeavingHouse: false,
//       preventingMeetingPerson: false,
//       forcedMarriage: false,
//       preventingMarriageOfChoice: false,
//       forcedMarriageAgainstWill: false,
//     }
//   },
//   otherVerbalAbuse: {
//     type: [String],
//     default: []
//   },
//   economicViolence: {
//     type: [String],
//     of: Boolean,
//     default: {
//       noMoneyForChildren: false,
//       noFoodClothesMedicine: false,
//       forcedOutOfHouse: false,
//       preventAccessHouse: false,
//       preventEmployment: false,
//       noEmployment: false,
//       nonPaymentRent: false,
//       noUseHouseholdItems: false,
//       sellingStridhan: false,
//       takingSalary: false,
//       disposingStridhan: false,
//       nonPaymentBills: false,
//     }
//   },
//   otherEconomicViolence: {
//     type: [String],
//     default: []
//   },
//   additionalInfo: {
//     type: String,
//     default: ""
//   }
// }, { timestamps: true });

// // Export the model
// const FormTwo = mongoose.model('FormTwo', FormTwoSchema);
// export default FormTwo;

import mongoose from 'mongoose';

const FormTwoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sexualViolence: {
    forcedIntercourse: { type: Boolean, default: false },
    forcedPornography: { type: Boolean, default: false },
    forcedEntertainment: { type: Boolean, default: false },
    otherSexualAbuse: { type: [String], default: [] } // Adjusted to include otherSexualAbuse
  },
  verbalEmotionalAbuse: {
    accusation: { type: Boolean, default: false },
    insultDowry: { type: Boolean, default: false },
    insultNoMaleChild: { type: Boolean, default: false },
    insultNoChild: { type: Boolean, default: false },
    demeaningRemarks: { type: Boolean, default: false },
    ridicule: { type: Boolean, default: false },
    nameCalling: { type: Boolean, default: false },
    forcingNotAttendSchool: { type: Boolean, default: false },
    preventingJob: { type: Boolean, default: false },
    preventingLeavingHouse: { type: Boolean, default: false },
    preventingMeetingPerson: { type: Boolean, default: false },
    forcedMarriage: { type: Boolean, default: false },
    preventingMarriageOfChoice: { type: Boolean, default: false },
    forcedMarriageAgainstWill: { type: Boolean, default: false },
    otherVerbalAbuse: { type: [String], default: [] } // Adjusted to include otherVerbalAbuse
  },
  economicViolence: {
    noMoneyForChildren: { type: Boolean, default: false },
    noFoodClothesMedicine: { type: Boolean, default: false },
    forcedOutOfHouse: { type: Boolean, default: false },
    preventAccessHouse: { type: Boolean, default: false },
    preventEmployment: { type: Boolean, default: false },
    noEmployment: { type: Boolean, default: false },
    nonPaymentRent: { type: Boolean, default: false },
    noUseHouseholdItems: { type: Boolean, default: false },
    sellingStridhan: { type: Boolean, default: false },
    takingSalary: { type: Boolean, default: false },
    disposingStridhan: { type: Boolean, default: false },
    nonPaymentBills: { type: Boolean, default: false },
    otherEconomicViolence: { type: [String], default: [] } // Adjusted to include otherEconomicViolence
  },
  additionalInformation: {
    otherAdditionalInfo: { type: [String], default: [] } // Adjusted to include otherAdditionalInfo
  }
}, { timestamps: true });

const FormTwo = mongoose.model('FormTwo', FormTwoSchema);
export default FormTwo;
  