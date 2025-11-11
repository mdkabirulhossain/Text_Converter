import React, { useState, useEffect } from 'react';
import { Check, Loader2, Crown, Zap, FileText } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export default function Subscription() {
  const [plans, setPlans] = useState([]);
  const [subscribeLoading, setSubscribeLoading] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${API_BASE}/subscription/plans`);
        setPlans(res.data);
      } catch (err) {
        console.error('Error fetching plans:', err);
      }
    };
    fetchPlans();
  }, []);

  const handleSubscribe = async (planCode) => {
    setSubscribeLoading(planCode);
    try {
      const res = await axios.post(`${API_BASE}/subscription/subscribe`, {
        planCode,
        userEmail: 'user@example.com',
      });
      alert(res.data.message || 'Subscription successful!');
    } catch (err) {
      console.error(err);
      alert('Subscription failed');
    } finally {
      setSubscribeLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.code}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border-2 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{plan.name}</h3>
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ৳{plan.price}
                </span>
                <span className="text-gray-500 ml-2 font-medium">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.code)}
                disabled={subscribeLoading === plan.code}
                className="w-full py-3.5 rounded-xl font-semibold transition-all duration-300 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeLoading === plan.code ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </span>
                ) : plan.price === 0 ? (
                  'Get Started Free'
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
