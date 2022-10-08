


```jsx padded
import { Checkbox } from '@safe/components';
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

<>
  <Checkbox />
  <br />
  <Checkbox defaultChecked={false} disabled />
  <br />
  <Checkbox defaultChecked disabled />
</>
```
