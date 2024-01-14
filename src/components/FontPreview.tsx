import React, { useEffect, useState } from 'react';
// @ts-expect-error - FontName doesn't have types
import FontName from 'fontname';
import { sampleText } from './constants';
import { type FontMeta, type FontPreviewProps } from './types';

export default function FontPreview (props: FontPreviewProps): JSX.Element {
  const { fontUrl, text } = props;
  const [fontFamily, setFontFamily] = useState<string>('');

  const onLoad = async (fontLink: string): Promise<any> => {
    try {
      // Fetch font file using URL
      const fontData = await fetch(fontLink);
      // Convert font file to ArrayBuffer to be parsed
      const fontBuffer = await fontData.arrayBuffer();
      // Parse font file to get font meta data
      const fontMeta: FontMeta[] = FontName.parse(fontBuffer);
      // Apply font to text
      const fontFace = new FontFace(fontMeta[0].fontFamily, fontBuffer);
      (document as any).fonts.add(fontFace);
      await fontFace.load();

      // Set font family to be used in the preview
      setFontFamily(fontMeta[0].fontFamily);
    } catch (err) {
      console.log(err);
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
