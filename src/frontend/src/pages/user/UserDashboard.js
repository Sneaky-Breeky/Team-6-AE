import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Input, Button, DatePicker, Form, Typography, Card, Row, Col, } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Meta } = Card;

const projects = [
  { title: 'Bridge Construction', location: 'Toronto', image: '../../../images/bridge.jpg' },
  { title: 'High-Rise Development', location: 'Vancouver', image: '/images/highrise.jpg' },
  { title: 'Highway Expansion', location: 'Montreal', image: '/images/highway.jpg' },
  { title: 'Oil Pipeline Repair', location: 'Alberta', image: '/images/oil_pipeline.jpg' },
  { title: 'Park Restoration', location: 'Ottawa', image: '/images/park.jpg' },
  { title: 'School Construction', location: 'Quebec City', image: '/images/school.jpg' },
];

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search-results?query=${searchQuery}&date=${selectedDate || ''}`);
  };

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


      {/* Search stuff*/}
      <Box
          sx={{
            flexGrow: 1,
            backgroundColor: 'gray.50',
            padding: 1,
          }}
        >
          <Form
            layout="inline"
            onFinish={handleSearch}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Form.Item>
              <Input
                placeholder="Search files..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '300px' }}
              />
            </Form.Item>

            <Form.Item>
              <DatePicker
                placeholder="Select date"
                onChange={(date, dateString) => setSelectedDate(dateString)}
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" color="cyan" variant="solid">
            Search
          </Button>
            </Form.Item>
          </Form>
        </Box>





      {/* Main content */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        {/* Left container w buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            width: '20%',
            minWidth: '150px',
            padding: 2,
          }}
        >
          <Button color="cyan" variant="solid">
            Upload Images/Videos
          </Button>
          <Button color="cyan" variant="solid">
            Activity Log
          </Button>
        </Box>


        
        {/* Right container with active projects */}
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '60vh',
    width: '70%',
    margin: '20px auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  }}
>
  <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
    Active Projects
  </Title>
  <Box
    sx={{
      overflowY: 'auto',
      height: '100%',
      width: '100%',
      paddingRight: '10px',
    }}
  >
    <Row gutter={[16, 16]} justify="center">
      {projects.map((project, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            cover={
              <img
                alt={project.title}
                src={project.image}
                style={{ height: '80px', objectFit: 'cover' }}
              />
            }
            onClick={() => alert(`Redirecting to ${project.title}`)}
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <Meta
              title={project.title}
              description={project.location}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  </Box>
</Box>

        </Box>
    </Box>
  );
}