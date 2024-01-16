import React, { useEffect, useState } from 'react';

import { sampleText } from './constants';
import { type FontPreviewProps } from './types';
import { getFontBuffer, getFontDetails } from './utils';

export default function FontPreview (props: FontPreviewProps): JSX.Element {
  const { fontUrl, text, onFontLoad, onFontError } = props;
  const [fontFamily, setFontFamily] = useState<string>('');

  const onLoad = async (fontLink: string): Promise<any> => {
    try {
      // Load font
      const fontBuffer = await getFontBuffer(fontLink);

      // Get font details
      const fontMeta = await getFontDetails(fontBuffer);

      // Apply font to text
      const fontFace = new FontFace(fontMeta.fontFamily, fontBuffer);
      (document as any).fonts.add(fontFace);
      await fontFace.load();

      // Set font family to be used in the preview
      setFontFamily(fontMeta.fontFamily);

      // Custom callback function to be used in the parent component
      if (onFontLoad && typeof onFontLoad === 'function') {
        onFontLoad(fontMeta);
      }
    } catch (err) {
      if (onFontError && typeof onFontError === 'function' && err instanceof Error) {
        onFontError(err);
      }

      setFontFamily('');
    }
  };

  useEffect(() => {
    if (fontUrl) {
      void onLoad(fontUrl);
    }
  }, [fontUrl]);

  return (
    <div className='font-preview' style={{ fontFamily }}>
      {text ?? sampleText}
    </div>
  );
};
