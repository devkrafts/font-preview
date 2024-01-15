import React, { useState } from 'react';
import { FontPreview } from './components';
import './App.css';
import { FontMeta } from './components/types';

const fonts = [
  `${window.location.href}fonts/WOFF2/Roboto.woff2`,
  `${window.location.href}fonts/WOFF/ResotE-Rose-89c1.woff`,
  `${window.location.href}fonts/TTF/Montserrat-Regular.ttf`
]

function App (): JSX.Element {
  const [fontUrl, setFontUrl] = useState<string>('');
  const [appliedFont, setAppliedFont] = useState<FontMeta>({} as FontMeta);
  const [fontApplyError, setFontApplyError] = useState<string>('');

  const onFontLoad = (fontMeta: FontMeta) => {
    setFontApplyError('');
    setAppliedFont(fontMeta);
  }

  const onFontError = (err: Error) => {
    if(err) {
      setAppliedFont({} as FontMeta);
      setFontApplyError('Could not apply font');
    }
  }

  return (
    <div className="App">
      <div className="App__header">Font Preview</div>
        <div className="App__content">
        {
          fonts.map((font, index) => (
            <div key={index} className="App__fonts">
              <span>{font}</span>
              <button onClick={() => setFontUrl(font)}>Try</button>
            </div>
          ))
        }
      </div>

      <input
        placeholder='Paste URL of the font file you want to preview'
        className="App__input"
        value={fontUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFontUrl(e.target.value)}
      />

      <div className='App__preview'>
        {
          appliedFont.fontFamily && 
          <div className='App__font-family'>
            <span>{appliedFont.fontFamily}</span>
            <span> applied ✅</span>
          </div>
        }
        {
          fontApplyError &&
          <div className='App__font-error'>
            <span>{fontApplyError}</span>
          </div>
        }
        <FontPreview fontUrl = {fontUrl} onFontLoad={onFontLoad} onFontError={onFontError}/>
      </div>
    </div>
  );
}

export default App;
