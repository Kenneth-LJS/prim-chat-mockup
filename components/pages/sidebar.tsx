import React from 'react';
import styles from './edit.module.scss';

export default () => {
  const onDragStart = (event, nodeType, flowType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      nodeType,
      flowType
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className={styles.description}>You can drag these nodes to the pane on the right. Press backspace to delete a node.</div>
      <div className={`${styles.dndnode}`} onDragStart={(event) => onDragStart(event, 'textNode', 'send')} draggable>
        Send
      </div>
      <div className={`${styles.dndnode}`} onDragStart={(event) => onDragStart(event, 'askNode', 'ask')} draggable>
        Ask
      </div>
      <div className={`${styles.dndnode}`} onDragStart={(event) => onDragStart(event, 'decisionNode', 'decide')} draggable>
        Decide
      </div>
      <div className={`${styles.dndnode}`} onDragStart={(event) => onDragStart(event, 'optionNode', 'option')} draggable>
        Options
      </div>
    </aside>
  );
};
