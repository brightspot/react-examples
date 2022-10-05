import { createRoot } from 'react-dom/client';
import './index.css'
// import 'core-js/features/array/flat-map'
// import 'core-js/features/map'
// import 'core-js/features/promise'
// import 'core-js/features/set'
// import 'raf/polyfill'
// import 'whatwg-fetch'

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<h1>Hello there!!</h1>);
