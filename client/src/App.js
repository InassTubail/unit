import React from 'react';

import ExpandRow from './ExpandRow';
import productsStore from './productsStore';

const App = () => (
  <div className="App">
    <ExpandRow store={productsStore} />
  </div>
);

export default App;