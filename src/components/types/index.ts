export interface FontPreviewProps {
  fontUrl: string
  text?: string
  onFontLoad?: (fontMeta: FontMeta) => void
  onFontError?: (err: Error) => void
}

export interface FontMeta {
  fontFamily: string
  copyright?: string
  _lang?: number
  fontSubfamily?: string,
  ID?: string,
  fullName?: string
  version?: string
  postScriptName?: string
  manufacturer?: string
  designer?: string
  urlVendor?: string
  urlDesigner?: string
  licence?: string
  licenceURL?: string
  preferredFamily?: string
}
