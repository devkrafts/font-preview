# A react component to preview fonts.



## Installation
```
npm install font-preview
OR
yarn add font-preview
```


## Usage
```javascript
import { FontPreview } from 'font-preview';

<FontPreview
  fontUrl="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2"
  text="The quick brown fox jumps over the lazy dog"
/>
OR
<FontPreview
  fontUrl="https://keybored.pro/static/media/SourceCodePro-Regular.2cacf64afc86b76c81e6.ttf"
  text="The quick brown fox jumps over the lazy dog"
/>
```

## Props
| Prop | Type | Description | Required
| --- | --- | --- | --- |
| fontUrl | string | The url of the font file | true |
| text | string | The text to preview | false |

## Customization
You can customize the `<FontPreview />` component by either wrapping it in an element
and customizing the element or by adding styles to the class `font-preview` in your
css file. `font-preview` is the class assigned to the `div` that displays the text
with font-preview.
