import React from 'react';

interface NameEntryProps {
  playerName: string;
  onNameChange: (name: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export function NameEntry({ playerName, onNameChange, onSubmit, disabled }: NameEntryProps) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        value={playerName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Enter your name"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A3990] focus:border-transparent outline-none"
        maxLength={20}
      />
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          disabled
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-[#2A3990] text-white hover:bg-[#232f75]'
        }`}
      >
        Submit
      </button>
    </div>
  );
}