import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Dialog from '../common/dialog';
import styles from './edit.module.scss';

function DecisionNode({ data, id }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [handles, setHandles] = useState(data?.value || [{}]);

  const closeDialog = function() {
    setIsDialogOpen(false);
    data.onChange({
      id,
      value: handles
    });
  }
  
  const updateNumHandles = function(evt) {
    const numHandles = parseInt(evt.target.value);
    if (isNaN(numHandles)) {
      return;
    }
    let newHandles = handles.slice(0, numHandles);
    while (newHandles.length < numHandles) {
      newHandles.push({});
    }
    setHandles(newHandles)
  }
  return (
    <div className={`${styles.textNode}`} onDoubleClick={() => setIsDialogOpen(true)} style={{background: '#d8dff5'}}>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog} onExternalClick={closeDialog}>
          <div style={{width: '300px', height: '50px'}}>
            <label htmlFor="text">Num options:</label>
            <input id="text" name="text" value={handles.length} onChange={updateNumHandles} />
          </div>
      </Dialog>
      <Handle type="target" id="target" position={Position.Top} />
      <div>
        <span>Decide</span>
      </div>
      {handles.map((handle, index) =>
        <Handle type="source" position={Position.Bottom} id={`${index.toString()}-${handles.length}`} key={index.toString()} style={{left: `${Math.round(200 / handles.length * (index + 0.5))}px`}} />
      )}
    </div>
  );
}

export default DecisionNode;
