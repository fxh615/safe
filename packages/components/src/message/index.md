```jsx padded
import { Button, message } from '@safe/components';

const info = () => {
  message.info('This is a normal message');
};

<div>
  <Button type="primary" onClick={info}>
    Display normal message
  </Button>
</div>;
```
