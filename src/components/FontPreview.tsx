import React, { useEffect, useState } from 'react';
// @ts-expect-error - FontName doesn't have types
import FontName from 'fontname';
import { decompress } from 'woff2-encoder';
// @ts-expect-error - package doesn't have types
import { toSfnt } from 'woff2sfnt-sfnt2woff-browser';

import { sampleText } from './constants';
import { type FontMeta, type FontPreviewProps } from './types';

export default function FontPreview (props: FontPreviewProps): JSX.Element {
  const { fontUrl, text, onFontLoad, onFontError } = props;
  const [fontFamily, setFontFamily] = useState<string>('');

  const onLoad = async (fontLink: string): Promise<any> => {
    try {
      // Fetch font file using URL
      const fontData = await fetch(fontLink);
      // Convert font file to ArrayBuffer to be parsed
      let fontBuffer = await fontData.arrayBuffer();

      // If font is woff2, decompress it to ttf using woff2-encoder
      const isWoff2 = fontLink.match(/\.woff2/);
      if(isWoff2) {
        fontBuffer = await decompress(fontBuffer);
      }

      // If font is woff, decompress it to ttf using woff2sfnt-sfnt2woff-browser
      const isWoff = fontLink.match(/\.woff/);
      if(isWoff && !isWoff2) {
        fontBuffer = await toSfnt(fontBuffer);
      }

      // Parse font file to get font meta data
      const fontMeta: FontMeta[] = FontName.parse(fontBuffer);
      // Apply font to text
      const fontFace = new FontFace(fontMeta[0].fontFamily, fontBuffer);
      (document as any).fonts.add(fontFace);
      await fontFace.load();

      // Set font family to be used in the preview
      setFontFamily(fontMeta[0].fontFamily);

      // Custom callback function to be used in the parent component
      if(onFontLoad && typeof onFontLoad === 'function') {
        onFontLoad(fontMeta[0]);
      }
    } catch (err) {
      if(onFontError && typeof onFontError === 'function' && err instanceof Error) {
        onFontError(err);
      }

      setFontFamily('');
    }
  };

  useEffect(() => {
    if (fontUrl) {
      void onLoad(fontUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontUrl]);

  return (
    <div className='font-preview' style={{ fontFamily }}>
      {text ?? sampleText}
    </div>
  );
};
