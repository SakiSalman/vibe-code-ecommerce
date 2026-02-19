import React, { useState } from 'react';
import { Sparkles, Send, X } from 'lucide-react';
import { Button } from './Button';
import { generateProductInsight } from '../services/gemini';

interface AiAssistantProps {
  productName: string;
  productDescription: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ productName, productDescription }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    const result = await generateProductInsight(productName, productDescription, query);
    setResponse(result);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm text-primary">
                <Sparkles size={20} />
            </div>
            <div>
                <h4 className="font-semibold text-secondary">Have questions?</h4>
                <p className="text-sm text-gray-600">Ask our AI Assistant about this product.</p>
            </div>
        </div>
        <Button size="sm" onClick={() => setIsOpen(true)}>Ask AI</Button>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden ring-1 ring-indigo-50">
      <div className="bg-gradient-to-r from-primary to-indigo-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
            <Sparkles size={18} />
            <span className="font-semibold">Lumina AI Assistant</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
            <X size={18} />
        </button>
      </div>
      
      <div className="p-6">
        {response ? (
          <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-100 animate-fade-in">
             <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">AI Response</h5>
             <p className="text-gray-700 leading-relaxed">{response}</p>
             <button 
                onClick={() => { setResponse(null); setQuery(''); }}
                className="text-xs text-primary font-medium mt-3 hover:underline"
             >
                Ask another question
             </button>
          </div>
        ) : (
             <div className="mb-6">
                <p className="text-sm text-gray-500 mb-4">
                    I can help you with details about materials, care instructions, compatibility, or styling tips!
                </p>
                <div className="flex gap-2 flex-wrap">
                    {['Is it waterproof?', 'How do I clean it?', 'Is it good for gifts?'].map(q => (
                        <button 
                            key={q} 
                            onClick={() => setQuery(q)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {!response && (
            <form onSubmit={handleAsk} className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question here..."
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
            />
            <button 
                type="submit" 
                disabled={isLoading || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
            >
                {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={16} />}
            </button>
            </form>
        )}
      </div>
    </div>
  );
};