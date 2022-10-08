```jsx padded
import { Button, notification } from '@safe/components';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

<div>
  <Button type="primary" onClick={openNotification}>
    Open the notification box
  </Button>
</div>;
```
