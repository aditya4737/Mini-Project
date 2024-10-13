import mongoose from 'mongoose';

const AssistanceOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: '' },
});

const FormThreeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dowryDemands: [
    {
      id: { type: Number, required: true },
      value: { type: String, default: '' },
    },
  ],
  dowryRelatedHarassment: {
    otherDowryDetails: { type: String, default: '' },
  },
  protectionOrder: { type: String, default: '' },
  otherOrderDetails: { type: String, default: '' },
  legalOrders: { type: [String], default: [] }, // This will store the legal orders in an array
  attachedDocuments: [
    {
      name: { type: String, required: true },
      label: { type: String, required: true },
    },
  ],
  assistanceOptions: [AssistanceOptionSchema],
}, { timestamps: true });

const FormThree = mongoose.model('FormThree', FormThreeSchema);
export default FormThree;
