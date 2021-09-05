import React from 'react';
import { Form } from 'antd';

import './formItem.scss';

interface IFormItemProps {
  name: string;
  label?: string;
  rules?: any;
  wrapperCol?: any;
  children: any;
}

export const FormItem: React.FunctionComponent<IFormItemProps> = ({
  name,
  label,
  rules,
  wrapperCol,
  children,
}) => {

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      wrapperCol={wrapperCol}
      className='formItem'
    >
      {children}
    </Form.Item>
  );
};

export default FormItem;
