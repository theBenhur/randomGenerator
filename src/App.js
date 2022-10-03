import './App.css';
import './styles.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CHARACTERS, LENGTH } from './constants';
function App() {
  const [passwordLength, setPasswordLength] = useState(3);

  const generateRandomPassword = useCallback(() => {
    let finalPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      finalPassword += CHARACTERS[Math.floor(Math.random() * LENGTH) + 1];
    }
    return finalPassword;
  }, [passwordLength]);
  const [password, setPassword] = useState(() => generateRandomPassword());
  const [copied, setCopied] = useState(false);
  const timer = useRef();
  useEffect(() => {
    setPassword(generateRandomPassword());
  }, [passwordLength, generateRandomPassword]);
  const copy = () => {
    const password = document.getElementById('password');

    navigator.clipboard.writeText(password.textContent);
  };
  useEffect(() => {
    timer.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer.current);
  }, [copied]);

  return (
    // <div className="App">
    <div className="content">
      <div className="wrapper">
        <h1>Random password generator</h1>
        <hr />
        <div className="password-wrapper">
          <p>Password:</p>
          <p id="password">{password}</p>
          <button
            onClick={(e) => {
              copy();
              setCopied(true);
            }}
            className="copy-btn"
          >
            {copied ? (
              <i className="fa-solid fa-check"></i>
            ) : (
              <i className="fa-solid fa-copy"></i>
            )}
          </button>
        </div>
        <div className="slider-wrapper">
          <p>Length: {passwordLength}</p>
          <input
            type="range"
            min={3}
            max={12}
            onChange={(e) => {
              setPasswordLength(e.target.value);
            }}
            value={passwordLength}
          />
        </div>
        <button
          onClick={() => setPassword(generateRandomPassword())}
          className="generate-btn"
        >
          Generate
        </button>
      </div>
    </div>
    // </div>
  );
}

export default App;
