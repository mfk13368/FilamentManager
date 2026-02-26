import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, onAddTag, onRemoveTag }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAddTag(input.trim());
      setInput('');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          placeholder="z.B. Favorit, Schnell, ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
        />
        <button 
          type="button" 
          onClick={handleAdd}
          className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1"
        >
          <Plus size={18} />
          <span>Hinzufügen</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {tags.map(tag => (
          <span key={tag} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 animate-in fade-in zoom-in duration-150">
            {tag}
            <button type="button" onClick={() => onRemoveTag(tag)} className="hover:text-blue-900 bg-blue-100 rounded-full p-0.5 transition-colors">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
