import React from 'react';

const FormatSaver = ({ content, callback, closeSaver, saver }) => {
  return (
    <div
      className="format-saver"
      onClick={e => {
        console.log(e.target);
        let a = e.target;
        let els = [];
        while (a) {
          els = [
            ...els,
            ...(a.classList != undefined ? Array.from(a.classList) : []),
          ];
          a = a.parentNode;
        }
        console.log(els);
        if (els.includes('format-saver__content')) return;
        closeSaver();
      }}
    >
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
            if (
              document.querySelector('.format-saver__name').value == '' ||
              document.querySelector('.format-saver__name').value == ''
            )
              return;
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
