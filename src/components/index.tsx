import * as React from 'react';
import * as ReactDom from 'react-dom';

import Header from '../components/header/Header';

ReactDom.render(<Header compiler="Typescript" framework="React" />,document.getElementById("divHeader"));