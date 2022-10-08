import React from 'react';
import {Alert, DatePicker, Space, Input, Form} from '@safe/components';

const App = () => {

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
    <Input placeholder='ghhahahah' />
    <Form>
      <Form.Item label="hhhh">
        <Input placeholder='hhhhhh' />
      </Form.Item>
    </Form>
    <Alert message="Success Text" type="success" />
    <Space direction="vertical">
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />
  </Space>
    </>

  )
};

export default App;
