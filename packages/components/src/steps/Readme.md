


```jsx padded
import { Steps } from '@safe/components';
import React from 'react';
const { Step } = Steps;

const App = () => (
  <Steps current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>
);


<App/>;
```
