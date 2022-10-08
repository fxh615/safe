


```jsx padded
import { TimePicker } from '@safe/components';
import moment from 'moment';
const onChange = (time, timeString) => {
  console.log(time, timeString);
};

<TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />;
```
