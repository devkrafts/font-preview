import React, { useState } from 'react';
import { FontPreview } from './components';
import './App.css';

function App (): JSX.Element {
  const [fontUrl, setFontUrl] = useState<string>('');

  return (
    <div className="App">
      <div className="App__header">Font preview</div>
      <div>Paste URL of the font file</div>
      <input
        className="App__input"
        value={fontUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFontUrl(e.target.value)}
      />
      <FontPreview fontUrl = {fontUrl} text={'abc'}/>
    </div>
  );
}

export default App;
