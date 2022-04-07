import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Dialog from '../common/dialog';
import styles from './edit.module.scss';
import React from 'react';
import { getBezierPath, getEdgeCenter, getMarkerEnd } from 'react-flow-renderer';

const foreignObjectSize = 20;

const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function TextEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [value, setValue] = useState(data.value);
  
  const closeDialog = function() {
    setIsDialogOpen(false);
    data.onChange({
      id,
      value
    });
  }

  const index = parseInt(data.sourceHandle.split('-')[0]);
  const length = parseInt(data.sourceHandle.split('-')[1]);
  sourceX += Math.round(200 / length * (index + 0.5) - 100);
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  /*
  <foreignObject
    width={foreignObjectSize}
    height={foreignObjectSize}
    x={edgeCenterX - foreignObjectSize / 2}
    y={edgeCenterY - foreignObjectSize / 2}
    className={styles.edgebuttonForeignobject}
    requiredExtensions="http://www.w3.org/1999/xhtml"
  >
    <div>
      <button className={styles.edgebutton} onClick={(event) => onEdgeClick(event, id)}>
        ×
      </button>
    </div>
  </foreignObject>
  */
  return (
    <>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog} onExternalClick={closeDialog}>
          <div style={{width: '300px', height: '50px'}}>
            <label htmlFor="text">Option:</label>
            <input id="text" name="text" value={value} onChange={(evt) => setValue(evt.target.value)} onKeyDown={(evt) => evt.key === 'Enter' && closeDialog()}/>
          </div>
      </Dialog>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text
        className={styles.edgeLabel}
        onDoubleClick={() => setIsDialogOpen(true)}
        textAnchor='middle'
        x={sourceX}
        y={sourceY + 15}>
        {value}
      </text>
    </>
  );
}
