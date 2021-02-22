import React from 'react';
import TodoList from './TodoList';
import { data } from '../../store/data';
import { useDispatch, useSelector } from 'react-redux';
import { getCards, getColumns, getLists } from '../../selectors/todos.selector';

export default function Todos() {
  const dispatch = useDispatch();
  const columnSelector = useSelector(getColumns);
  const listsSelector = useSelector(getLists);
  const cardSelector = useSelector(getCards);

  return (
    <div style={{ display: 'flex' }}>
      {
        columnSelector.length > 0 ? (
          <>
            {columnSelector.map((column, idx) => {
              const lists = listsSelector[column];
              const cards = lists.cards.map(card => cardSelector[card])
              return (
                <TodoList
                  key={lists.id}
                  listId={lists.id}
                  title={lists.title}
                  cards={cards}
                  index={idx}
                />
              )
            })}
          </>
        ) : null
      }
    </div>
  )
}
