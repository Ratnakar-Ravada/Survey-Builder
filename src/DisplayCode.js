import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
function DisplayCode({ codeData }) {
  const { head, body, script } = codeData;

  const copyToClipboard = (code) => {
    const textArea = document.createElement('textarea');
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  return (
    <div className='viewCode'>
      <div>
        <h4>Head: Copy the code and paste it in the `head` tag of the main HTML document</h4>
        <div className='codeCopy'>
          <SyntaxHighlighter language="html" style={vscDarkPlus}>
            {head}
          </SyntaxHighlighter>
          <button onClick={() => copyToClipboard(head)} className='copybtn'><i className="fa fa-clipboard" aria-hidden="true"/> Copy</button>
        </div>
      </div>
      <div>
        <h4>Body: Copy the code and paste it in the body where the Survey should appear</h4>
        <div className='codeCopy'>
          <SyntaxHighlighter language="html" style={vscDarkPlus}>
            {body}
          </SyntaxHighlighter>
          <button onClick={() => copyToClipboard(body)} className='copybtn'><i className="fa fa-clipboard" aria-hidden="true"/> Copy</button>
        </div>
      </div>
      <div>
        <h4>Script: Add this code below the body tag or even inside a body tag</h4>
        <div className='codeCopy'>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {script}
          </SyntaxHighlighter>
          <button onClick={() => copyToClipboard(script)} className='copybtn'><i className="fa fa-clipboard" aria-hidden="true"/> Copy</button>
        </div>
      </div>
    </div>
  );
}

export default DisplayCode;
