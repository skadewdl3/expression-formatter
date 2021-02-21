import React, { useState, useEffect } from 'react';
import {
  PlusOutlined,
  FormatPainterOutlined,
  ApartmentOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import Output from './Output';
import Input from './Input';

const MainUI = () => {
  const [tab, setTab] = useState('input');
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [savedInputs, setSavedInputs] = useState(
    JSON.parse(window.localStorage.getItem('savedInputs'))
  );

  const addInput = () => {
    let arr = [...inputs];
    arr.push({
      content: '',
      placeholder: 'Input text here',
    });
    setInputs(arr);
  };

  const removeInput = index => {
    let arr = [...inputs];
    arr = arr.filter((cur, i) => i != index);
    console.log(arr);
    setInputs(arr);
  };

  const updateInput = (index, val) => {
    let arr = [...inputs];
    console.log(index, arr, val);
    arr = arr.map((cur, i) =>
      i == index
        ? {
            ...cur,
            content: val,
          }
        : cur
    );
    setInputs(arr);
  };

  let outputArr = [];

  const convert = (inpF, outF) => {
    setOutputs([]);
    inputs.forEach(selection => {
      let inputFormatString = inpF;
      let outputFormatString = outF;

      let inputFormat = inputFormatString.toString();
      let outputFormat = outputFormatString.toString();

      let cats = inputFormat.split(/[%%]/).filter((cur, i) => i % 2 == 1);

      let delims = inputFormat.split(/[%%]/).filter((cur, i) => i % 2 == 0);
      delims = delims.slice(1);
      delims.pop();

      let str = '';
      let strArr = [];
      delims.forEach((cur, i) => {
        if (i === 0) str = selection.content;
        console.log(str);
        let cat = str.split(cur)[0];
        str = str.replace(`${cat}${cur}`, '');
        strArr.push(cat);
        if (i === delims.length - 1) strArr.push(str);
      });

      let strObj = {};
      cats.forEach((cur, i) => {
        strObj = {
          ...strObj,
          [cur]: strArr[i],
        };
      });

      let catsOut = outputFormat.split(/[%%]/).filter((cur, i) => i % 2 == 1);
      let delimsOut = outputFormat.split(/[%%]/).filter((cur, i) => i % 2 == 0);
      delimsOut = delimsOut.slice(1);
      if (delimsOut[delimsOut.length - 1] == '') {
        delimsOut.pop();
      }

      str = '';
      catsOut.forEach((cur, i) => {
        str = `${str}${strObj[cur]}${delimsOut[i] ? delimsOut[i] : ''}`;
      });

      console.log('Final: ', str);
      outputArr.push(str);
    });
    console.log(outputArr);
    setOutputs(outputArr);
  };

  const removeSavedInput = i => {
    let arr = savedInputs.filter((cur, index) => index != i);
    if (arr == []) {
      setSavedInputs(null);
      console.log('this ran');
      return;
    }
    setSavedInputs(arr);
    localStorage.setItem('savedInputs', JSON.stringify(arr));
  };

  const saveInput = inp => {
    if (savedInputs) {
      let newArr = [...savedInputs, inp];
      setSavedInputs(newArr);
      localStorage.setItem('savedInputs', JSON.stringify(newArr));
    } else {
      setSavedInputs([inp]);
      localStorage.setItem('savedInputs', JSON.stringify([inp]));
    }
  };

  return (
    <div className="main-ui">
      <div className="main-ui__section">
        <div className="main-ui__controls">
          <div className="main-ui__controls__left">
            <button
              className="main-ui__controls__tab"
              onClick={() => setTab('input')}
              style={{ background: tab === 'input' ? '#fff' : '#eee' }}
            >
              <div className="main-ui__controls__tab--icon">
                <ApartmentOutlined />
              </div>
              <div className="main-ui__controls__tab--name">Input</div>
            </button>
            <button
              className="main-ui__controls__tab"
              style={{ background: tab === 'output' ? '#fff' : '#eee' }}
              onClick={() => setTab('output')}
            >
              <div className="main-ui__controls__tab--icon">
                <FormatPainterOutlined />
              </div>
              <div className="main-ui__controls__tab--name">Output</div>
            </button>
          </div>
          <div className="main-ui__controls__right">
            <button
              className="main-ui__controls__btn"
              onClick={() => addInput()}
            >
              <PlusOutlined />
            </button>
          </div>
        </div>
        {tab === 'output' ? (
          <Output outputs={outputs} />
        ) : (
          <Input
            removeInput={removeInput}
            updateInput={updateInput}
            inputs={inputs}
          />
        )}
      </div>
      <div className="main-ui__input-wrapper">
        <div className="main-ui__input">
          <div className="main-ui__textbox main-ui__inputbox">
            <div className="main-ui__textbox__label">Input Format</div>
            <div className="main-ui__textbox-wrapper">
              <textarea
                type="text"
                className="main-ui__textinput main-ui__inputbox__input"
              />
              <button
                className="main-ui__saveinput"
                onClick={() => {
                  saveInput(
                    document.querySelector('.main-ui__inputbox__input').value
                  );
                }}
              >
                <SaveOutlined />
              </button>
            </div>
          </div>

          <div className="main-ui__textbox main-ui__outputbox">
            <div className="main-ui__textbox__label">Output Format</div>
            <textarea
              type="text"
              className="main-ui__textinput main-ui__outputbox__input"
            />
          </div>
          <button
            className="main-ui__cta"
            onClick={() => {
              convert(
                document.querySelector('.main-ui__inputbox__input').value,
                document.querySelector('.main-ui__outputbox__input').value
              );
            }}
          >
            Convert!
          </button>
        </div>
        {savedInputs != null && savedInputs[0] && (
          <>
            <div className="main-ui__savedinputs">
              <div className="main-ui__title">Saved Inputs</div>
              {savedInputs !== null &&
                savedInputs.map((cur, i) => (
                  <div key={i} className="main-ui__savedinputs-wrapper">
                    <div
                      className="main-ui__savedinput"
                      onClick={e => {
                        e.target;
                        document.querySelector(
                          '.main-ui__inputbox__input'
                        ).value = cur;
                      }}
                    >
                      <p>{cur}</p>
                    </div>
                    <button onClick={() => removeSavedInput(i)}>
                      <CloseOutlined />
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainUI;