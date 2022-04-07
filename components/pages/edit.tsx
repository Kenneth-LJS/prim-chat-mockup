import React, { Fragment, FunctionComponent, useContext, useState, useRef, useCallback, useEffect } from 'react';
import PlatformContext from '../../context/platform-context';
import { Theme } from '../../context/theme-context';
import ContentSection from '../common/content-section';
import MainLayout from '../layouts/main-layout';
import SiteHead from '../common/site-head';
import Header from '../common/header';
import P from '../common/paragraph';
import Dialog from '../common/dialog';
import styles from './edit.module.scss';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from 'react-flow-renderer';
import Sidebar from './sidebar';
import TextNode from './textNode';
import AskNode from './askNode';
import DecisionNode from './decisionNode';
import OptionNode from './optionNode';
import TextEdge from './textEdge';


export type EditProps = {
    isConnected: boolean;
    data?: any;
    flowId: string;
};

const defaultNodes = [
  {
    id: '0',
    type: 'input',
    data: { label: 'Start' },
    selectable: false,
    position: { x: 250, y: 5 }
  },
]
const nodeTypes = { textNode: TextNode, decisionNode: DecisionNode, askNode: AskNode, optionNode: OptionNode};

const edgeTypes = {
  textEdge: TextEdge,
};
const IndexPage: FunctionComponent<EditProps> = ({ isConnected, data, flowId }) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(data?.nodes.length ? data.nodes : defaultNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data?.edges || []);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback((params) => {
      setEdges((eds) => addEdge({ ...params, type: params.sourceHandle?.includes('-') ? 'textEdge' : 'bezierEdge', data: params.sourceHandle?.includes('-') ? {
        sourceHandle: params.sourceHandle,
        value: '<Default>',
        onChange: onEdgeChange
       } : {}
      }, eds))
    }, []);

    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
  
    const onEdgeChange = (data) => {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id !== data.id) {
            return edge;
          }
          return {
            ...edge,
            data: {
              ...edge.data,
              value: data.value
            },
          };
        })
      );
    };

    useEffect(() => {
      setEdges((eds) =>
        eds.map((edge) => {
          return {
            ...edge,
            data: {
              ...edge.data,
              onChange: onEdgeChange,
            },
          };
        })
      );
    
      setNodes((nds) =>
        nds.map((node) => {
          return {
            ...node,
            data: {
              ...node.data,
              onChange: onNodeChange,
            },
          };
        })
      );
    }, []);

    const onNodeChange = (data) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== data.id) {
            return node;
          }
          return {
            ...node,
            data: {
              ...node.data,
              value: data.value
            },
          };
        })
      );
    };

    const onDrop = useCallback(
      (event) => {
        event.preventDefault();
  
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const { nodeType, flowType } = JSON.parse(event.dataTransfer.getData('application/reactflow'));
  
        // check if the dropped element is valid
        if (typeof nodeType === 'undefined' || !nodeType) {
          return;
        }
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id: Date.now().toString(),
          type: nodeType,
          position,
          data: {
            label: `${flowType} node`,
            onChange: onNodeChange,
            value: '',
          },
        };
  
        setNodes((nds) => nds.concat(newNode));
      },
      [reactFlowInstance]
    );

    const onSave = useCallback(async () => {
      if (reactFlowInstance) {
        const flow = reactFlowInstance.toObject();
        let response = await fetch(`/api/edit/${flowId}`, {
            method: 'POST',
            body: JSON.stringify(flow),
        });
      }
    }, [reactFlowInstance]);
  
    /*
    */

    return (
        <Fragment>
          <style global jsx>{`
            .selected {
              background-color: #ccccff;
            }
            .selected > div {
              background-color: #ccccff;
            }
            .react-flow__node {
              font-family: 'Roboto', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 11px;
              cursor: grab;
            }
          `}</style>
          <div className={styles.dndflow}>
              <ReactFlowProvider>
              <div className={styles.reactflowWrapper} ref={reactFlowWrapper}>
                  <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  snapToGrid
                  fitView
                  >
                  <Controls />
                  </ReactFlow>
              </div>
              <div style={{background: '#f7f7ff'}}>
                  <button className={styles.saveBtn} onClick={onSave}>Save</button>
              </div>
              <Sidebar />
              </ReactFlowProvider>
          </div>
        </Fragment>
    );
};

export default IndexPage;
