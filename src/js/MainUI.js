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
import FormatSaver from './FormatSaver';

const MainUI = () => {
  const [tab, setTab] = useState('input');
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [savedInputs, setSavedInputs] = useState(
    JSON.parse(window.localStorage.getItem('savedInputs')) != null
      ? JSON.parse(window.localStorage.getItem('savedInputs'))
      : []
  );
  const [saver, setSaver] = useState(null);

  const [savedOutputs, setSavedOutputs] = useState(
    JSON.parse(window.localStorage.getItem('savedOutputs')) != null
      ? JSON.parse(window.localStorage.getItem('savedOutputs'))
      : []
  );
  const [formatType, setFormatType] = useState('input');

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
        let brk = '';
        let dels = [];
        if (i === 0) str = selection.content;
        console.log(cur);
        if (cur.split('')[0] == '(') {
          dels = cur.split(/[()]/)[1].split('');
          console.log('dels: ', dels);
        } else {
          brk = cur;
        }
        console.log(str);
        dels.forEach(del => {
          if (str.split('').includes(del)) {
            brk = del;
            return;
          }
        });
        let cat = str.split(brk)[0];
        str = str.replace(`${cat}${brk}`, '');

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
        let newCat = '';
        let operators = [];
        let temp = cur.split(/[()]/);
        if (temp.length == 1) {
          newCat = cur;
        } else {
          newCat = cur.split(')')[1];
          operators = [...temp[1].split(',')];
        }
        let newStr = strObj[newCat];
        console.log(operators);

        // handle bold, italic, underline
        let tags = [];
        if (operators[0]) {
          let textOperators = operators[0].split('');
          if (textOperators.includes('*')) {
            tags.push('b');
          }
          if (textOperators.includes('_')) {
            tags.push('u');
          }
          if (textOperators.includes('/')) {
            tags.push('i');
          }
        }

        if (operators[1] && operators[1].trim() != '') {
          newStr = newStr.slice(0, operators[1]);
        }

        if (operators[2] && operators[2].trim() != '') {
          newStr = newStr
            .split('')
            .slice(
              newStr.split('').length - operators[2],
              newStr.split('').length
            )
            .join('');
        }

        tags.forEach((cur, ind) => {
          if (ind === tags.length - 1) {
            newStr = `<${cur}>${newStr}</${cur}>${
              delimsOut[i] ? delimsOut[i] : ''
            }`;
          } else {
            newStr = `<${cur}>${newStr}</${cur}>`;
          }
        });

        if (tags.length == 0) {
          newStr = `${newStr}${delimsOut[i] ? delimsOut[i] : ''}`;
        }
        str = `<span>${str}${newStr}</span>`;
      });

      console.log('Final: ', str);
      outputArr.push(`<div>${str}</div>`);
    });
    console.log(outputArr);
    setOutputs(outputArr);
    setTab('output');
  };

  const removeSavedFormat = (i, type) => {
    let arr = (type === 'input' ? savedInputs : savedOutputs).filter(
      (cur, index) => index != i
    );
    if (arr == []) {
      if (type === 'input') {
        setSavedInputs(null);
      } else {
        setSavedOutputs(null);
      }
      console.log('this ran');
      return;
    }
    if (type === 'input') {
      setSavedInputs(arr);
    } else {
      setSavedOutputs(arr);
    }
    localStorage.setItem(
      `saved${type === 'input' ? 'Inputs' : 'Outputs'}`,
      JSON.stringify(arr)
    );
  };

  const saveFormat = (name, inp, type) => {
    if (savedInputs || savedOutputs) {
      let newArr = [
        ...(type == 'input' ? savedInputs : savedOutputs),
        { name, format: inp },
      ];
      if (type === 'input') {
        setSavedInputs(newArr);
        console.log(newArr);
      } else {
        setSavedOutputs(newArr);
        console.log(newArr);
      }
      localStorage.setItem(
        `saved${type === 'input' ? 'Inputs' : 'Outputs'}`,
        JSON.stringify(newArr)
      );
    } else {
      localStorage.setItem(
        `saved${type === 'input' ? 'Inputs' : 'Outputs'}`,
        JSON.stringify([{ name, format: inp }])
      );
      console.log(newArr);
    }
  };

  const openSaver = type => {
    if (type === 'input') {
      setSaver('input');
    } else if (type === 'output') {
      setSaver('output');
    }
  };

  const closeSaver = () => {
    setSaver(null);
  };

  return (
    <>
      {saver != null && (
        <FormatSaver
          content={document.querySelector(`.main-ui__${saver}box__input`).value}
          saver={saver}
          callback={saveFormat}
          closeSaver={closeSaver}
        />
      )}
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
                title="Add Input"
              >
                <PlusOutlined title="Add Input" />
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
                    openSaver('input');
                  }}
                  title="Save Input Format"
                >
                  <SaveOutlined title="Save Input Format" />
                </button>
              </div>
            </div>

            <div className="main-ui__textbox main-ui__outputbox">
              <div className="main-ui__textbox__label">Output Format</div>
              <div className="main-ui__textbox-wrapper">
                <textarea
                  type="text"
                  className="main-ui__textinput main-ui__outputbox__input"
                />
                <button
                  className="main-ui__saveinput"
                  onClick={() => {
                    openSaver('output');
                  }}
                  title="Save Output Format"
                >
                  <SaveOutlined title="Save Output Format" />
                </button>
              </div>
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
          <div className="main-ui__savedinputs">
            <div className="main-ui__title">Saved Formats</div>
            <div className="main-ui__formattype">
              <span
                className={`main-ui__formattype__option ${
                  formatType === 'input'
                    ? 'main-ui__formattype__option--active'
                    : ''
                }`}
                onClick={() => {
                  setFormatType('input');
                  console.log(savedInputs);
                }}
              >
                Input
              </span>
              <span
                className={`main-ui__formattype__option ${
                  formatType === 'output'
                    ? 'main-ui__formattype__option--active'
                    : ''
                }`}
                onClick={() => {
                  setFormatType('output');
                  console.log(savedOutputs);
                }}
              >
                Output
              </span>
            </div>
            <div className="main-ui__savedformatdisplay">
              {!(formatType == 'input' ? savedInputs : savedOutputs)[0] ? (
                <p className="main-ui__savedformatdisplay__message">
                  No saved {formatType} formats.
                </p>
              ) : (
                (formatType === 'input'
                  ? savedInputs == null
                    ? []
                    : savedInputs
                  : savedOutputs == null
                  ? []
                  : savedOutputs
                ).map((cur, i, arr) => (
                  <>
                    {!arr[0] ? (
                      <span>No saved {formatType} formats.</span>
                    ) : (
                      <div key={i} className="main-ui__savedinputs-wrapper">
                        <div
                          className="main-ui__savedinput"
                          onClick={e => {
                            e.target;
                            document.querySelector(
                              `.main-ui__${formatType}box__input`
                            ).value = typeof cur == 'object' ? cur.format : cur;
                          }}
                        >
                          <p>{typeof cur == 'object' ? cur.name : ''}</p>
                          <p>{typeof cur == 'object' ? cur.format : cur}</p>
                        </div>
                        <button
                          onClick={() => removeSavedFormat(i, formatType)}
                        >
                          <CloseOutlined />
                        </button>
                      </div>
                    )}
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainUI;
