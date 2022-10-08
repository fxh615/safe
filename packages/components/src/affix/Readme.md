

**注意：**`Affix` 内的元素不要使用绝对定位，如需要绝对定位的效果，可以直接设置 `Affix` 为绝对定位：


```jsx padded
import { Affix, Button } from '@safe/components';

  <Affix offsetTop={10}>
    <Button type="primary">
        Affix top
    </Button>
  </Affix>
```
