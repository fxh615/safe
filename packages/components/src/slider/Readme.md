


```jsx padded
import { Slider, Switch} from '@safe/components';
import React, { useState } from 'react';

const App = () => {
  const [disabled, setDisabled] = useState(false);

  const onChange = (checked) => {
    setDisabled(checked);
  };

  return (
    <>
      <Slider defaultValue={30} disabled={disabled} />
      <Slider range defaultValue={[20, 50]} disabled={disabled} />
      Disabled: <Switch size="small" checked={disabled} onChange={onChange} />
    </>
  );
};
<App/>;
```
