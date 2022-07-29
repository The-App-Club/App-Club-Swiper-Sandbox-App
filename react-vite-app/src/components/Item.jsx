import {css} from '@emotion/css';
import {AnimatePresence, motion, useAnimation} from 'framer-motion';
import {useEffect, useState} from 'react';
import {default as Layout} from '../layouts/default';
import {RiDeleteBin5Line} from 'react-icons/ri';

const Item = ({total, index, onDelete, data}) => {
  const controls = useAnimation();
  const [isDelete, setIdDelete] = useState(false);
  const handleDragEnd = async (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    console.log(offset);
    if (offset < -150) {
      console.log(`a`);
      await controls.start({x: '-100%', transition: {duration: 0.2}});
      onDelete(index);
    } else if (-150 < offset && offset < 0) {
      console.log(`b`);
      await controls.start({
        x: `-30%`,
        opacity: 1,
        transition: {duration: 0.5},
      });
      setIdDelete(true);
    } else if (0 < offset && offset < 150) {
      console.log(`c`);
      await controls.start({x: `0%`, opacity: 1, transition: {duration: 0.5}});
      setIdDelete(false);
    } else {
      console.log(`d`);
      setIdDelete(false);
      await controls.start({x: `0%`, opacity: 1, transition: {duration: 0.5}});
    }
  };

  return (
    <motion.div
      className={css`
        width: 100%;
        min-height: 70px;
        overflow: hidden;
        margin-bottom: 1rem;
        will-change: transform;
        cursor: grab;
      `}
      whileTap={{cursor: 'grabbing'}}
      layout
      transition={{type: 'spring', stiffness: 600, damping: 30}}
    >
      <Layout>
        <div
          className={css`
            width: 100%;
            min-height: 70px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
          `}
        >
          <motion.div
            className={css`
              padding: 0.5rem;
              width: 100%;
              height: 100%;
              background-color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1rem;
              position: relative;
              margin-right: ${isDelete ? '-30%' : 'initial !important'};
            `}
            drag="x"
            dragDirectionLock
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            <motion.img
              src={data.url}
              width={30}
              className={css`
                flex-basis: 30%;
              `}
              alt={``}
            />
            <p
              className={css`
                flex-basis: 70%;
                padding: 0.5rem;
              `}
            >
              {data.description}
            </p>
          </motion.div>
          <div
            className={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: ${isDelete ? 'auto' : 0};
              transition: width 0.6s ease-in-out;
              &:hover {
                cursor: pointer;
              }
            `}
            onClick={async (e) => {
              await controls.start({x: '-100%', transition: {duration: 0.2}});
              onDelete(index);
            }}
          >
            <RiDeleteBin5Line size={40} />
          </div>
        </div>
      </Layout>
    </motion.div>
  );
};

export {Item};
