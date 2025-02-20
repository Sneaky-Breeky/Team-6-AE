import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, } from 'antd';

const { Title } = Typography;

export default function AdminMetadataManage() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {/* Title */}
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
        }}
      >
        <Title level={1}>Metadata Management</Title>
      </Box>
        
        {/* Right container with activity log */}
<Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'left',
    height: '60vh',
    width: '60%',
    margin: '20px auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'auto',
  }}
>

    <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <tr>
            <th style={{height: '50px', textAlign: 'left', borderBottom:'1px solid black'}} >Timestamp</th>
            <th style={{height: '50px', textAlign: 'left', borderBottom:'1px solid black'}} >Activities</th>
        </tr>
    </table>

</Box>

    </Box>
  );
}