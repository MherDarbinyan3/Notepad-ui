import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { routeConfig } from '../../../navigation/routeConfig';

import FormItem from '../../../components/shared/FormItem/FormItem';
import NoteItem from '../../../components/shared/NoteItem/NoteItem';

import './newNotepad.scss';

export const NewNotepad: React.FunctionComponent = () => {
  const history = useHistory();
  const [noteItems, setNoteItems] = useState<[number]>([ 1 ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [ notepadItems, setNotepadItems ] = useLocalStorage('notepads');

  const getNotes = (items: any) => {
    const filteredItems = Object.keys(items).filter((item: any) => item.indexOf('noteTitle') !== -1);
    let notes: any = [];
    filteredItems.map((key: any) => {
      const index = key.split('-')[1];
      notes.push({
        id: +index,
        title: items[`noteTitle-${index}`],
        note: items[`note-${index}`],
      });
    });

    return notes;
  }

    const onSubmit = (values: any) => {
    setLoading(true);
    const {notepadTitle, ...rest} = values;

    const item = {
      id: Date.now(),
      title: notepadTitle,
      notes: getNotes(rest)
    }

    setNotepadItems([...notepadItems, item]);
    setLoading(false);

    history.push(routeConfig.notepad.path);
  };

  return (
    <Form
      name="newNotepad"
      initialValues={{ }}
      layout='vertical'
      onFinish={onSubmit}
    >
      <Button
        type="primary"
        icon={<LeftOutlined />}
        onClick={() => history.push(routeConfig.notepad.path)}
        className='backButton'
      >
        Back
      </Button>
      <Row justify='space-between'>
        <Col span={18}>
          <FormItem
            label='Notepad Title'
            name='notepadTitle'
            rules={[
              { required: true, message: 'Required!' },
              {max: 255, message: 'Max 255 characters'}
            ]}
            wrapperCol={{ offset: 0, span: 8 }}
          >
            <Input
              placeholder='My notepad title…'
              size='large'
            />
          </FormItem>
          <div className='noteLabel'>My Notes</div>
          {noteItems.map((note: any) => (
            <NoteItem index={note} noteItems={noteItems} setNoteItems={setNoteItems} />
          ))}
        </Col>
        <Col span={6}>
          <Row align='middle' justify='end'>
            <Button
              size='large'
              className='viewStat'
              onClick={() => history.push(routeConfig.stat.path)}
            >
              View Stats
            </Button>
            <Button
              disabled={loading}
              size='large'
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default NewNotepad;
