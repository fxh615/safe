```jsx padded
import { InputNumber } from '@safe/components';

const onChange = value => {
  console.log('changed', value);
};

<div>
  <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
</div>;
```
