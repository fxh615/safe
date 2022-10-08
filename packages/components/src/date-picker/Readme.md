


```jsx padded
import { DatePicker } from '@safe/components';
const { RangePicker } = DatePicker;
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

<>
  <DatePicker onChange={onChange} size="large" />
  <br/>
  <RangePicker />
</>
```
