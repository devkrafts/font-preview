// @ts-expect-error - FontName doesn't have types
import FontName from 'fontname';
import { decompress } from 'woff2-encoder';
// @ts-expect-error - package doesn't have types
import { toSfnt } from 'woff2sfnt-sfnt2woff-browser';
import { type FontMeta } from './types';

export const getFontBuffer = async (fontLink: string): Promise<ArrayBuffer> => {
  // Fetch font file using URL
  const fontData = await fetch(fontLink);
  // Convert font file to ArrayBuffer to be parsed
  let fontBuffer = await fontData.arrayBuffer();

  // If font is woff2, decompress it to ttf using woff2-encoder
  const isWoff2 = fontLink.match(/\.woff2/);
  if (isWoff2) {
    fontBuffer = await decompress(fontBuffer);
  }

  // If font is woff, decompress it to ttf using woff2sfnt-sfnt2woff-browser
  const isWoff = fontLink.match(/\.woff/);
  if (isWoff && !isWoff2) {
    fontBuffer = await toSfnt(fontBuffer);
  }

  return fontBuffer;
};

export const getFontDetails = async (fontData: string | ArrayBuffer): Promise<FontMeta> => {
  let fontBuffer = fontData;

  if (typeof fontData === 'string') { // If font is a URL
    fontBuffer = await getFontBuffer(fontData);
  }

  // Parse font file to get font meta data
  const fontMeta: FontMeta[] = FontName.parse(fontBuffer);

  return fontMeta[0];
};
