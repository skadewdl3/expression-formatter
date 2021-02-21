import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

const Input = ({ inputs, removeInput, updateInput }) => {
  return (
    <div className="input">
      {inputs.map((cur, i) => (
        <div key={i} className="input__textbox">
          <input
            value={cur.content}
            placeholder={cur.placeholder}
            onChange={e => {
              updateInput(i, e.target.value);
            }}
          />
          <button
            className="input__textbox__remove"
            onClick={() => removeInput(i)}
          >
            <CloseOutlined />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Input;
