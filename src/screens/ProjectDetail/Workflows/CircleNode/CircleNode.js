import React from 'react';
import { Handle, Position } from 'reactflow';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa6';
import './CircleNode.css'; // Import the CSS file for the loading effect
import { BiLeftArrow } from 'react-icons/bi';

const CircleNode = ({ data }) => {
  let circleColor;
  let isLoading = false; // Add a flag to track if loading effect should be applied
  // console.log('data', data);
  switch (data.conclusion) {
    case 'pending':
      circleColor = '#9CA8B3'; // gray
      break;
    case 'in_progress':
      circleColor = '#ffc501';
      isLoading = true; // Set isLoading to true when status is 'running'
      break;
    case 'success':
      circleColor = '#30a14e';
      break;
    case 'failure':
      circleColor = 'red';
      break;
    default:
      circleColor = '#ebedf0'; // gray
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div>
        <div
          className={`circle-node ${isLoading ? 'loading' : ''}`} // Add the 'loading' class when isLoading is true
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: circleColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            marginRight: 5,
          }}
        >
          {data.conclusion === 'success' ? (
            <FaCheck />
          ) : data.conclusion === 'failure' ? (
            <AiOutlineClose />
          ) : null}
        </div>
        {/* <Handle
          type="target"
          position={Position.Top}
          id="top"
          style={{ left: 10 }}
          isConnectable={true}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bot"
          style={{ left: 10 }}
          isConnectable={true}
        /> */}
      </div>
      <div>{data.label}</div>
    </div>
  );
};

export default CircleNode;
