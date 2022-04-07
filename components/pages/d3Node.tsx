import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Dialog from '../common/dialog';
import styles from './edit.module.scss';

function TextNode({ data, id }) {
  return (
    <div className={`${styles.textNode}`}>
      <Handle type="target" id="target" position={Position.Top} />
      <div>
        <p>Select: How many years of experience do you have in this area?</p>
        <ul>
          <li>No experience</li>
          <li>Less than 1 year</li>
          <li>3 years</li>
          <li>7 years</li>
          <li>More than 10 years</li>
        </ul>
      </div>
      <Handle type="source" id="source" position={Position.Bottom} />
    </div>
  );
}

export default TextNode;
