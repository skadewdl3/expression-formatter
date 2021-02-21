import React from 'react';
import { CopyOutlined } from '@ant-design/icons';

const Output = ({ outputs }) => {
  const copy = index => {
    const el = document.createElement('textarea');
    el.value = outputs[index];
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div className="output">
      {outputs.map((cur, i) => (
        <div key={i} className="output__text">
          <p>{cur}</p>
          <button className="output__text__copy" onClick={() => copy(i)}>
            <CopyOutlined />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Output;
