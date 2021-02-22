import React from 'react';
import Navbar from './Navbar';

const Help = () => {
  return (
    <div className="help">
      <Navbar page="help" />
      <div className="help__content">
        <span className="heading">What is Formatex ?</span>
        <br />
        <span className="text">
          Formatex is a regex-style editor for quickly trandforming a large
          amount of sentences with similar structure. Uses of formatex include
          refactoring references.
        </span>
        <br />
        <div className="divider-invisible"></div>
        <span className="heading">Legend</span>
        <br />
        <br />
        <ol>
          <li style={{ listStyle: 'none' }}>
            <strong className="subheading">
              %category_name% : Categroy Declaration
            </strong>
            <br />
            <br />
            <span className="text">
              You can use capital as well as small letters for category names.
              Avoid using symbols other than _. Do not use spaces or special
              symbols like '^' or '*' for category names. You may type category
              names in camel case like so: %firstName% but not like this: %first
              name%.
            </span>
            <br />
          </li>
          <div className="divider-invisible"></div>

          <li style={{ listStyle: 'none' }}>
            <strong className="subheading">
              %category1% - %category2% : Punctuation
            </strong>
            <br />
            <br />
            <span className="text">
              You can use any punctuation marks including numbers, letter and
              special symbols. These punctuation marks always have to be between
              two category declarations as shown. These are to be used for the
              output format. If you do not want punctuation from the input
              sentence in the categories, you have to include the punctuations
              outside the category declarations in the input format.
            </span>
            <br />
          </li>
          <div className="divider-invisible"></div>

          <li style={{ listStyle: 'none' }}>
            <strong className="subheading">
              %(*_/)category% : Text Formatting
            </strong>
            <br />
            <br />
            <span className="text">
              To format the text from the categories, you can use the formatting
              declarations. These must be written within the category
              declaration enclosed by parantheses. Note that the symbols used
              are as follows: *(<b>bold</b>), _(<u>underline</u>), /(
              <i>italic</i>). These may be used in any permutation you like. The
              symbols should not be repeated in any case. These symbols are to
              be used in the output format.
            </span>
            <br />
          </li>

          <div className="divider-invisible"></div>

          <li style={{ listStyle: 'none' }}>
            <strong className="subheading">
              %(text formatting, 1, 2)category% : Text Slicing
            </strong>
            <br />
            <br />
            <span className="text">
              You can trim the output text to your needs using text splicing
              options. For example, to select only the first character from the
              start, enter 1 after the text formatting options. If you want to
              select the first character from the end, enter 1 after the second
              comma. You may leave the fields you don't use as blank, but DO NOT
              forget to put the commas. Slicing tools too may be used in any
              permutation you like.
            </span>
            <br />
          </li>
        </ol>
        <div className="divider-invisible"></div>
        <span className="heading">Saving Formats</span>
        <br />
        <br />
        <span className="text">
          You can save the input and output formats you use often by clicking on
          the save button beside the respective textboxes. These will appear in
          the dialog box below. They can be used simply by clicking on the
          format. You can remove the saved formats by clicking the 'X' button
          beside them. Note that these formats are saved on your computer in
          local storage. If you ever clear browser history, make sure to not
          clear local storage for this website, or you WILL LOSE your saved
          formats.
        </span>
      </div>
    </div>
  );
};

export default Help;
