import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import Node from './Node';
import "@xyflow/react/dist/style.css";

const initialNodes = JSON.parse(localStorage.getItem('nodes')) || [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" }, type: 'custom' },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" }, type: 'custom' },
  { id: "3", position: { x: 100, y: 100 }, data: { label: "3" }, type: 'custom' },
  { id: "4", position: { x: 100, y: 100 }, data: { label: "4" }, type: 'custom' },
];

const initialEdges = JSON.parse(localStorage.getItem('edges')) || [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const NodeEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCounter, setNodeCounter] = useState(nodes.length);

  useEffect(() => {
    localStorage.setItem('nodes', JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem('edges', JSON.stringify(edges));
  }, [edges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode = {
      id: (nodeCounter + 1).toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodeCounter + 1}` },
      type: 'custom',
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCounter(nodeCounter + 1);
  };

  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const onLabelChange = (id, newLabel) => {
    setNodes((nds) => nds.map((node) => 
      node.id === id ? { ...node, data: { ...node.data, label: newLabel || 'nodo' } } : node
    ));
  };

  const onEdgeDoubleClick = (event, edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  const nodeTypes = {
    custom: (node) => <Node id={node.id} label={node.data.label} onDelete={deleteNode} onLabelChange={onLabelChange} />
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={addNode}>Agregar Nodo</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default NodeEditor;