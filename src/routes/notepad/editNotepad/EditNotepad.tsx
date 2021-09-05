import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { useLocalStorage } from '../../../hooks/useLocalStorage';

import FormItem from '../../../components/shared/FormItem/FormItem';
import NoteItem from '../../../components/shared/NoteItem/NoteItem';

import './editNotepad.scss';

interface IEditNotepadParams {
  id: string;
}

export const EditNotepad: React.FunctionComponent = () => {
  const history = useHistory();
  const { id } = useParams<IEditNotepadParams>();
  const [ notepadItems, setNotepadItems ] = useLocalStorage('notepads');
  const [noteItems, setNoteItems] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getItem = () => {
    return notepadItems.find((item: any) => item.id === +id);
  }

  const getInitialValues = () => {
    const notepad = getItem();
    let items = {};

    notepad.notes.map((note: any) => {
      const title = `noteTitle-${note.id}`;
      const noteItem = `note-${note.id}`;
      items = {
         ...items,
        [title]: note.title,
        [noteItem]: note.note,
      }
    })

    return {
      notepadTitle: notepad.title,
      ...items
    }
  }

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
    const notepad = getItem();
    const {notepadTitle, ...rest} = values;

    const item = {
      id: notepad.id,
      title: notepadTitle,
      notes: getNotes(rest)
    }

    const filteredItems = notepadItems.filter((item: any) => item.id !== +id);
    setNotepadItems([...filteredItems, item]);
    setLoading(false);

    history.push('/');
};

  const handleDeleteNotepad = () => {
    setLoading(true);

    const filteredItems = notepadItems.filter((item: any) => item.id !== +id);

    setNotepadItems([...filteredItems]);
    setLoading(false);

    history.push('/');
  }

  useEffect(() => {
    const notepad = getItem();
    const items = notepad.notes.map((item: any) => item.id);

    setNoteItems(items);
  }, []);

  if (!noteItems.length) {
    return null;
  }

  return (
    <Form
      name="editNotepad"
      initialValues={getInitialValues()}
      layout='vertical'
      onFinish={onSubmit}
    >
      <Button
        type="primary"
        icon={<LeftOutlined />}
        onClick={() => history.push('/')}
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
            <NoteItem key={note} index={note} noteItems={noteItems} setNoteItems={setNoteItems} />
          ))}
        </Col>
        <Col span={6}>
          <Row align='middle' justify='end'>
            <Button
              size='large'
              className='viewStat'
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
            <Button
              disabled={loading}
              type='primary'
              size='large'
              className='removeItem'
              onClick={handleDeleteNotepad}
              danger
            >
              Delete
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default EditNotepad;
