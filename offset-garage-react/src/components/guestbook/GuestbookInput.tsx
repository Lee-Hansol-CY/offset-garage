'use client';

import React, { useState, useRef, useEffect } from 'react';

interface GuestbookInputProps {
  onNewEntry: (content: string) => void;
}

const GuestbookInput: React.FC<GuestbookInputProps> = ({ onNewEntry }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_CHARS = 100;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHARS) {
      setInputValue(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onNewEntry(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="guestbook-input-container">
      <textarea
        id="guestbook-input"
        className="text-fs-18"
        placeholder="방명록을 남겨주세요 (최대 100자)..."
        maxLength={MAX_CHARS}
        value={inputValue}
        onChange={handleChange}
        ref={textareaRef}
        rows={1}
      ></textarea>
      <div className="input-controls">
        <span id="char-count" className="text-fs-12 text-gray-500">{inputValue.length}/{MAX_CHARS}</span>
        <button id="drop-it-button" className="nav-button" onClick={handleSubmit}>drop it!</button>
      </div>
      {/* <div id="guestbook-message" className="guestbook-message text-fs-14 hidden"></div> */}
    </div>
  );
};

export default GuestbookInput;