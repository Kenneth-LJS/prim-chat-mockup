import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Dialog from '../common/dialog';
import styles from './edit.module.scss';

function TextNode({ data, id }) {
  return (
    <div className={`${styles.textNode}`}>
      <Handle type="target" id="target" position={Position.Top} />
      <div>
        <p>Options: What is your ideal job type?</p>
        <ul>
          <li>Full-time</li>
          <li>Part-time</li>
          <li>Contract</li>
          <li>Temporary</li>
          <li>Internship</li>
          <li>Commission</li>
          <li>Skip for now</li>
        </ul>
      </div>
      <Handle type="source" id="source" position={Position.Bottom} />
    </div>
  );
}

export default TextNode;
