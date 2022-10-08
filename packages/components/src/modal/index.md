```jsx padded
import { Button ,Modal} from '@safe/components';
import { useState } from 'react';

const info = () => {
  message.info('This is a normal message');
};

const [isModalVisible, setIsModalVisible] = useState(false);

const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};

<div>
  <Button type="primary" onClick={showModal}>
    Open Modal
  </Button>
  <Modal
    title="Basic Modal"
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
</div>;
```
