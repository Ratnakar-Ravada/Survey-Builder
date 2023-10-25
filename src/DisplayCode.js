import React, {useState} from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function DisplayCode({ codeData }) {
  const [copyButtonsClicked, setCopyButtonsClicked] = useState({
    head: false,
    body: false,
    script: false,
  });

  const { head, body, script } = codeData;

  const copyToClipboard = (code, section) => {
    const textArea = document.createElement('textarea');
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // Set the specific section's copy button to "Copied"
    setCopyButtonsClicked((prevState) => ({
      ...prevState,
      [section]: true,
    }));

    // Reset the specific section's copy button to "Copy" after 3 seconds
    setTimeout(() => {
      setCopyButtonsClicked((prevState) => ({
        ...prevState,
        [section]: false,
      }));
    }, 3000);
  };

  return (
    <div className='viewCode'>
      <h3>Embed this following code as described</h3>
      <div>
        <h4>Head: Copy the code and paste it in the `head` tag of the main HTML document</h4>
        <div className='codeCopy'>
          <SyntaxHighlighter className="codeBody" language="html" style={vscDarkPlus} >
            {head}
          </SyntaxHighlighter>
          {!copyButtonsClicked.head ? (
            <button onClick={() => copyToClipboard(head, 'head')} className='copybtn'><i className="fa fa-clipboard" aria-hidden="true"/> Copy</button>
          ) : (
            <button className='copybtn clicked'><i className="fa fa-clipboard" aria-hidden="true"/> Copied </button>
          )}
        </div>
      </div>
      <div>
        <h4>Body: Copy the code and paste it in the `body` tag where the Survey should appear</h4>
        <div className='codeCopy'>
          <SyntaxHighlighter className="codeBody" language="html" style={vscDarkPlus}>
            {body}
          </SyntaxHighlighter>
          {!copyButtonsClicked.body ? (
            <button onClick={() => copyToClipboard(body, 'body')} className='copybtn'><i className="fa fa-clipboard" aria-hidden="true"/> Copy</button>
          ) : (
            <button className='copybtn clicked'><i className="fa fa-clipboard" aria-hidden="true"/> Copied </button>
          )}
        </div>
      </div>
      <div>
        <h4>Script: Add this code below the body tag or even at the end of the `body` tag</h4>
        <div className='codeCopy'>
          <SyntaxHighlighter className="codeBody" language="javascript" style={vscDarkPlus}>
            {script}
          </SyntaxHighlighter>
          {!copyButtonsClicked.script ? (
            <button onClick={() => copyToClipboard(script, 'script')} className='copybtn'><i className="fa fa-clipboard" aria-hidden="true"/> Copy</button>
          ) : (
            <button className='copybtn clicked'><i className="fa fa-clipboard" aria-hidden="true"/> Copied </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayCode;
