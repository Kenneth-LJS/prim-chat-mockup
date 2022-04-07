import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Dialog from '../common/dialog';
import styles from './edit.module.scss';

function OptionNode({ data, id }) {
  return (
    <div className={`${styles.textNode}`} style={{background: '#fcf4dd'}}>
      <Handle type="target" id="target" position={Position.Top} />
      <div>
        <span style={{"whiteSpace": "pre-line"}}>{data.select ? 'Select: ' : 'Options: '}<br />{data.text.replaceAll('\\n', '\n')}</span>
        <ul style={{paddingTop: "3px"}}>
          {(data.options?.map((option, index) => <li key={index.toString()}>{option}</li>))}
        </ul>
      </div>
      <Handle type="source" id="source" position={Position.Bottom} />
    </div>
  );
}

export default OptionNode;
