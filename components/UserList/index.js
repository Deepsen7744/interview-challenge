import React from 'react';
import styled from '@emotion/styled';
import useUserData from './useUserData';
import { columnFields } from './coloumnFields';

const Table = styled.table(() => ({
  width: '100%',
  borderCollapse: 'collapse',

  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
    position: 'relative',
  },

  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },

  '.sort-icon': {
    verticalAlign: 'middle',
    marginLeft: '5px',
  },

  '.search-input': {
    padding: '6px',
    width: '200px',
    marginTop: '8px',
    display: 'block',
  },
}));

const UserList = () => {
  const { users, handleOnSearch, handleSort, sortColumn, sortDirection } =
    useUserData();

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {columnFields.map(field => (
              <th key={field.value} onClick={() => handleSort(field.value)}>
                {field.label}
                {sortColumn === field.value && (
                  <span className={'sort-icon'}>
                    {sortDirection === 'asc' ? '▲' : '▼'}
                  </span>
                )}
                {field.enableSearch && (
                  <input
                    type={'text'}
                    placeholder={`Search by ${field.label}`}
                    name={field.value}
                    onChange={handleOnSearch}
                    className={'search-input'}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {columnFields.map(field => (
                <td key={field.value}>{user[field.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div></div>
    </div>
  );
};

export default UserList;
