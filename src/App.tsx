import './styles/index.scss';

import Theme from 'theme';
import Contents from 'contents';
import Mouse from 'constant/mouse';

const App = () => (
  <Theme>
    <Contents />
    <Mouse />
  </Theme>
);

export default App;