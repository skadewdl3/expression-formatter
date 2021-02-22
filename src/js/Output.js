import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import ReactHtmlParser from 'html-react-parser';

const Output = ({ outputs }) => {
  const copy = index => {
    let listener = e => {
      e.clipboardData.setData('text/html', outputs[index]);
      e.clipboardData.setData('text/plain', outputs[index]);
      e.preventDefault();
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  };

  return (
    <div className="output">
      {outputs.map((cur, i) => (
        <div key={i} className="output__text">
          {ReactHtmlParser(cur)}
          <button className="output__text__copy" onClick={e => copy(i)}>
            <CopyOutlined />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Output;
