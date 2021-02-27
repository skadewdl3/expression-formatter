import React from 'react';

const FormatSaver = ({ content, callback, closeSaver, saver }) => {
  return (
    <div className="format-saver">
      <div className="format-saver__content">
        <div className="format-saver__title">Save {saver} Format</div>
        <input
          placeholder="Enter Name"
          type="text"
          className="format-saver__input format-saver__name"
        />
        <input
          defaultValue={content}
          type="text"
          className="format-saver__input format-saver__format"
          placeholder="Enter Format"
        />
        <button
          onClick={() => {
            callback(
              document.querySelector('.format-saver__name').value,
              document.querySelector('.format-saver__format').value,
              saver
            );
            closeSaver();
          }}
          className="format-saver__cta"
        >
          Save!
        </button>
      </div>
    </div>
  );
};

export default FormatSaver;
