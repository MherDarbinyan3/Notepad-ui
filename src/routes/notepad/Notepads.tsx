import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'antd';

import { useLocalStorage } from '../../hooks/useLocalStorage';

import './notepads.scss';

interface Notepad {
  id: number;
  title: string,
  notes: [Note]
}

interface Note {
  title: string,
  note: string,
}

export const Notepads: React.FunctionComponent = () => {
  const history = useHistory();
  const [ notepadItems ] = useLocalStorage('notepads');

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
  ];

  const dataSource = notepadItems.map((item: Notepad) => {
    const notepad = {
        key: item.id,
        title: item.title,
        notes: item.notes.length,
    };

    return {
      ...notepad
    }
  })

  const handleRowClick = (record: any) => {
    history.push(`/${record.key}`);
  }

  return (
    <>
      <div className='action'>
        <Button
          onClick={() => history.push('/create')}
          type='primary'
          size='large'
        >
          Create Notepad
        </Button>
      </div>
      <Table
        className='notepadTable'
        dataSource={dataSource}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: event => {
              event.stopPropagation();
              handleRowClick(record)
            }
          };
        }}
        bordered
      />
    </>
  );
}

export default Notepads;
