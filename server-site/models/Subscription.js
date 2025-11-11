import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String },
  features: { type: [String], default: [] }
});

export default mongoose.model('Subscription', SubscriptionSchema);