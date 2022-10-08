


```jsx padded
import { Calendar } from '@safe/components';

const App = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return <Calendar onPanelChange={onPanelChange} />;
};

<App/>
```
