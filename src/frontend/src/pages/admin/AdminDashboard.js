import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Input, Button, Typography, Card, Row, Col } from 'antd';
import { PlusOutlined, UserOutlined, SettingOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Meta } = Card;

export default function AdminDashboard() {
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
      <Title level={1}>Dashboard</Title>
    </Box>

    <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '60vh',
    width: '70%',
    margin: '20px auto',
    padding: '20px',
    overflow: 'hidden',
  }}
>

      <Row gutter={[16, 16]} justify="center">
        <Col span={12} align="center">
          <Box
          onClick={() => alert(`Redirecting to "Create Project Directories"`)}
          sx={{
            textAlign: 'center',
            width: 250,
            height: 200,
            backgroundColor: 'grey.300',
            border: 1,
            borderColor: 'grey.500',
            borderRadius: '16px',
            '&:hover': { boxShadow: 3},
            }}
          >
            <UserOutlined style={{ marginTop: '30px', fontSize: '80px'}}/>
            <h4>Create Project Directories</h4>
          </Box>
        </Col>

        <Col span={12} align="center">
          <Box
          onClick={() => alert(`Redirecting to "User Management"`)}
          sx={{
            textAlign: 'center',
            width: 250,
            height: 200,
            backgroundColor: 'grey.300',
            border: 1,
            borderColor: 'grey.500',
            borderRadius: '16px',
            '&:hover': { boxShadow: 3},
            }}
          >
            <SettingOutlined style={{ marginTop: '30px', fontSize: '80px'}}/>
            <h4>User Management</h4>
          </Box>
        </Col>

        <Col span={12} align="center">
          <Box
          onClick={() => alert(`Redirecting to "Metadata Management"`)}
          sx={{
            textAlign: 'center',
            width: 250,
            height: 200,
            backgroundColor: 'grey.300',
            border: 1,
            borderColor: 'grey.500',
            borderRadius: '16px',
            '&:hover': { boxShadow: 3},
            }}
          >
            <PlusOutlined style={{ marginTop: '30px', fontSize: '80px'}}/>
            <h4>Metadata Management</h4>
          </Box>
        </Col>

        <Col span={12} align="center">
          <Box
          onClick={() => alert(`Redirecting to "Assign Project Security"`)}
          sx={{
            textAlign: 'center',
            width: 250,
            height: 200,
            backgroundColor: 'grey.300',
            border: 1,
            borderColor: 'grey.500',
            borderRadius: '16px',
            '&:hover': { boxShadow: 3},
            }}
          >
            <LockOutlined style={{ marginTop: '30px', fontSize: '80px'}}/>
            <h4>Assign Project Security</h4>
          </Box>
        </Col>

      </Row>
    </Box>
  </Box>
  );
}
