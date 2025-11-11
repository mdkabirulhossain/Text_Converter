import Subscription from "../models/Subscription.js";

export const listPlans = async (req, res) => {
  try {
    const existing = await Subscription.find();
    if (existing.length) return res.json(existing);

    const defaults = [
      { name: "Basic", price: 0, code: "BASIC", features: ["Generate PDF", "Max 1 page"] },
      { name: "Pro", price: 499, code: "PRO", features: ["Generate PDF", "Max 20 pages", "Priority support"] },
      { name: "Premium", price: 999, code: "PREMIUM", features: ["Unlimited PDF", "Priority support", "Custom templates"] },
    ];

    await Subscription.insertMany(defaults);
    res.json(defaults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const subscribe = async (req, res) => {
  try {
    const { planCode, userEmail } = req.body;
    if (!planCode) return res.status(400).json({ message: "Plan code required" });

    const plan = await Subscription.findOne({ code: planCode });
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    return res.json({ message: `Subscribed to ${plan.name}`, plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
