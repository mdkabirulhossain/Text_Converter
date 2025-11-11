import React, { useState } from 'react';
import { Download, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export default function Converter() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGeneratePdf = async () => {
    if (!text.trim()) return alert('Please enter some text');
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/pdf`,
        { text, title: title || 'Document' },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(title || 'document').replace(/[^a-z0-9]/gi, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      alert('PDF downloaded successfully!');
      setText('');
      setTitle('');
    } catch (err) {
      console.error(err);
      alert('Error generating PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Text to PDF Converter</h2>
          <p className="text-gray-600">Transform your text into beautiful PDF documents instantly</p>
        </div>

        <div className="space-y-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document Title"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            placeholder="Start typing your content here..."
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
          />
          <div className="flex justify-end">
            {text.length > 0 && (
              <button
                onClick={() => {
                  setText('');
                  setTitle('');
                }}
                className="text-xs text-red-500 hover:text-red-600 font-medium mr-2"
              >
                Clear All
              </button>
            )}
          </div>
          <button
            onClick={handleGeneratePdf}
            disabled={loading || !text.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" /> Generate & Download PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
