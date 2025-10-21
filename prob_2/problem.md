# Problem 2 - `react_tabs`

Your task is to implement a simple tabs component in React.

## Requirements

- Your component must return a `div` with classname of `tabs`.
- For each `children` element with `title` property, the component should render a button with classname of `btn`.
- Clicking on a button should change the currently active tab by:
  - rendering a child element corresponding to it in a `div` with a classname of `view`.
  - disabling the button (HTML attribute) and changing its classname to `btn-active`.
- Initially the first tab should be active ( the first child rendered, and the first button disabled with class `btn-active`).
- Only one button should be active at any given moment.

Remember to make your components `default export`

## Hints

- Your solution will be evaluted based on its correctness; performance and coding style will not be accessed.
- Both class and functional components are allowed.

### Available packages/libraries

- JavaScript
- React 17.0.1

## Examples

```jsx
<MyTabComponent>
  <div title={"Section title 1"}> Content of section 1 </div>
  <div title={"Section title 2"}> Content of section 2 </div>
</MyTabComponent>
```

The above example should render this structure:

```html
<div class="tabs">
  <button class="btn-active">Section title 1</button>
  <button class="btn">Section title 2</button>
  <div class="views">Content of section 1</div>
</div>
```
