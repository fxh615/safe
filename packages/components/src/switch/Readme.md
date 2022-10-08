


```jsx padded
import { Switch  } from '@safe/components';
import React from 'react';

const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

const App = () => <Switch defaultChecked onChange={onChange} />;
<App/>;
```
