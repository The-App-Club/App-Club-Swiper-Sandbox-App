import {css} from '@emotion/css';
import {AnimatePresence, motion, useAnimation} from 'framer-motion';
import {useEffect} from 'react';
import {default as Layout} from '../layouts/default';

const Item = ({total, index, onDelete, data}) => {
  const controls = useAnimation();

  const handleDragEnd = async (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) {
      await controls.start({x: '-100%', transition: {duration: 0.2}});
      onDelete(index);
    } else {
      // console.log(`a`);
      // await controls.start({x: `-30%`, opacity: 1, transition: {duration: 0.5}});
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
        <motion.div
          className={css`
            width: 100%;
            min-height: 70px;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            position: relative;
            ::after {
              content: 'a';
              position: absolute;
              width: 70px;
              height: 70px;
              top: 0;
              right: 0;
            }
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
      </Layout>
    </motion.div>
  );
};

export {Item};
