import ReactFlow, { Controls, Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useState, useEffect } from 'react';
import { applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';

import CircleNode from '../CircleNode/CircleNode';

const parseJobsToNodesAndEdges = (jobs) => {
  const nodes = [];
  const edges = [];
  const parentWidth = 300; // Width for parent nodes
  const childHeight = 30; // Height for each step node
  const childWidth = 200; // Width for child nodes

  jobs.forEach((job, jobIndex) => {
    const parentId = job.name;
    const parentPositionX = jobIndex * 400; // Adjust the spacing between parent nodes
    const parentPositionY = 50;

    // Create the parent node
    nodes.push({
      id: parentId,
      data: { label: job.name },
      position: { x: parentPositionX, y: parentPositionY },
      sourcePosition: 'right',
      targetPosition: 'left',
      style: {
        backgroundColor: '#d9d9d9',
        width: parentWidth,
        height: job.steps.length * childHeight + 50,
      },
    });
    // Create the child nodes
    job.steps.forEach((step, stepIndex) => {
      const childId = `${parentId}-${stepIndex + 1}`;
      nodes.push({
        id: childId,
        data: { label: step.name, status: step.status },
        type: 'step',
        position: {
          x: 30,
          y: 30 + stepIndex * childHeight,
        },
        parentId: parentId,
        style: {
          backgroundColor: 'rgba(f,f,f)',
          width: childWidth,
          height: childHeight,
        },
        extent: 'parent',
      });

      // // Create the edges between child nodes of the same parent
      // if (stepIndex > 0) {
      //   edges.push({
      //     id: `${parentId}-${stepIndex}-${stepIndex + 1}`,
      //     source: `${parentId}-${stepIndex}`,
      //     target: childId,
      //     // sourceHandle: 'b',
      //     // targetHandle: 'a',
      //   });
      // }
    });

    // Create the edges based on dependencies
    job.depend_on.forEach((dependency) => {
      edges.push({
        id: `${dependency}-to-${parentId}`,
        source: dependency,
        target: parentId,
        //   type: 'step',
      });
    });
  });
  return { nodes, edges };
};

const nodeTypes = { step: CircleNode };

const JobNode = ({ job }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (job) {
      const { nodes: parsedNodes, edges: parsedEdges } =
        parseJobsToNodesAndEdges(job);
      setNodes(parsedNodes);
      setEdges(parsedEdges);
    }
  }, [job]);

  //   const onNodesChange = useCallback(
  //     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //     [],
  //   );

  //   const onEdgesChange = useCallback(
  //     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //     [],
  //   );

  //   const onConnect = useCallback(
  //     (connection) => setEdges((eds) => addEdge(connection, eds)),
  //     [],
  //   );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      //   onConnect={onConnect}
      //   onNodesChange={onNodesChange}
      //   onEdgesChange={onEdgesChange}
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <Controls />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
};

export default JobNode;
