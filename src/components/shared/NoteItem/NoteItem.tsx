import React from 'react';
import { Button, Col, Input, Row } from 'antd';

import FormItem from '../FormItem/FormItem';

import './noteItem.scss';

interface INoteItemProps {
  index: number;
  noteItems: any;
  setNoteItems: any;
}

export const NoteItem: React.FunctionComponent<INoteItemProps> = ({
  index,
  noteItems,
  setNoteItems,
}) => {
  const { TextArea } = Input;

  const handleAdd = () => {
    const nextItem = noteItems.length + 1;
    setNoteItems([...noteItems, nextItem]);

  }

  const handleDelete = (index: number) => {
    const items = noteItems.filter((item: any) => item !== index);
    setNoteItems(items);
  }

  return (
    <div className='noteItem'>
      <Row>
        <Col span={index === 1 ? 24 : 16}>
          <FormItem
            name={`noteTitle-${index}`}
            rules={[
              { required: true, message: 'Required!' },
              { max: 255, message: 'Max 255 characters' },
            ]}
            wrapperCol={{ offset: 0, span: index === 1 ? 16 : 24  }}
          >
            <Input
              placeholder='Enter note title…'
              size='large'
            />
          </FormItem>
        </Col>
        {index !== 1 && (
          <Col span={4}>
            <Button
              onClick={() => handleDelete(index)}
              type='primary'
              size='large'
              className='removeItem'
              danger
            >
              Delete
            </Button>
          </Col>
        )}
      </Row>
      <FormItem
        name={`note-${index}`}
        rules={[
          { required: true, message: 'Required!' },
          { max: 1000, message: 'Max 1000 characters' }
        ]}
        wrapperCol={{ offset: 0, span: 16 }}
      >
        <TextArea
          placeholder='Enter note…'
          size='large'
          rows={4}
        />
      </FormItem>
      {index === 1 && (
        <Button
          onClick={handleAdd}
          className='success'
          size='large'
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default NoteItem;
