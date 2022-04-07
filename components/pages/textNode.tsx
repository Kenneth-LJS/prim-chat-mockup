import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Dialog from '../common/dialog';
import styles from './edit.module.scss';

function TextNode({ data, id }) {
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
    <div className={`${styles.textNode}`} onDoubleClick={() => setIsDialogOpen(true)} style={{background: '#ddedea'}}>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog} onExternalClick={closeDialog}>
          <div style={{width: '300px', height: '50px'}}>
            <label htmlFor="text">Enter text to send:</label>
            <input id="text" value={value} name="text" onChange={(evt) => setValue(evt.target.value)} onKeyDown={(evt) => evt.key === 'Enter' && closeDialog()} />
          </div>
      </Dialog>
      <Handle type="target" id="target" position={Position.Top} />
      <div>
        <span style={{"whiteSpace": "pre-line"}}>Send: {data.value.replaceAll('\\n', '\n')}</span>
      </div>
      <Handle type="source" id="source" position={Position.Bottom} />
    </div>
  );
}

export default TextNode;
