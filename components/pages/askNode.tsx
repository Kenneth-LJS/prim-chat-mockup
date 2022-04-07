import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Dialog from '../common/dialog';
import styles from './edit.module.scss';

function AskNode({ data, id }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [value, setValue] = useState(data.value);

  const closeDialog = function() {
    setIsDialogOpen(false);
    data.onChange({
      id,
      value
    });
  }
  return (
    <div className={`${styles.textNode}`} style={{background: '#daeaf6'}} onDoubleClick={() => setIsDialogOpen(true)}>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog} onExternalClick={closeDialog}>
          <div style={{width: '300px', height: '50px'}}>
            <label htmlFor="text">Store reply in:</label>
            <input id="text" value={value} name="text" onChange={(evt) => setValue(evt.target.value)} onKeyDown={(evt) => evt.key === 'Enter' && closeDialog()} />
          </div>
      </Dialog>
      <Handle type="target" id="target" position={Position.Top} />
      <div>
        <span>Ask =&gt; {data.value}</span>
      </div>
      <Handle type="source" id="source" position={Position.Bottom} />
    </div>
  );
}

export default AskNode;
