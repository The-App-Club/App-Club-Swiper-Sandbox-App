import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import {Button} from '@mui/material';
import {motion, useAnimation, useMotionValue} from 'framer-motion';

import data from './data/dump';

import {Item} from './components/Item';

import '@fontsource/inter';
import './styles/index.scss';

const App = (props) => {
  const [items, setItems] = useState(data);
  const [deletedIdList, setDeletedIdList] = useState([]);

  const onDelete = (index) => {
    // console.log(data[index].id);
    setDeletedIdList((prevDeletedIdList) => {
      return [...prevDeletedIdList, data[index].id];
    });
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div
      className={css`
        margin: auto;
        max-width: 30rem;
        width: 100%;
        position: relative;
        background: pink;
        min-height: 100vh;
        padding: 1rem;
      `}
    >
      <div
        className={css`
          width: 100%;
          position: relative;
        `}
      >
        <motion.div drag="y" dragConstraints={{top: 0, bottom: 0}}>
          {deletedIdList.length > 0 ? (
            <>
              {items
                .filter((item) => {
                  return !deletedIdList.every((deletedId) => {
                    return item.id === deletedId;
                  });
                })
                .map((item, index) => {
                  return (
                    <Item
                      total={items.length}
                      index={index}
                      onDelete={onDelete}
                      key={item.id}
                      data={item}
                    />
                  );
                })}
            </>
          ) : (
            <>
              {items.map((item, index) => {
                return (
                  <Item
                    total={items.length}
                    index={index}
                    onDelete={onDelete}
                    key={item.id}
                    data={item}
                  />
                );
              })}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
