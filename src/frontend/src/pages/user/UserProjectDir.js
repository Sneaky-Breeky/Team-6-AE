import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Input, Button, DatePicker, Form, Typography, Card, Row, Col, Select, Space } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Meta } = Card;

const projects = [
  { title: 'Bridge Construction', location: 'Toronto', image: '/images/bridge.webp', id: 0 },
  { title: 'High-Rise Development', location: 'Vancouver', image: '/images/highrise.jpg', id: 1 },
  { title: 'Highway Expansion', location: 'Montreal', image: '/images/highway.jpg', id: 2 },
  { title: 'Oil Pipeline Repair', location: 'Alberta', image: '/images/pipeline.jpg', id: 3 },
  { title: 'Park Restoration', location: 'Ottawa', image: '/images/park.jpeg', id: 4 },
  { title: 'School Construction', location: 'Quebec City', image: '/images/school.png', id: 5 },
  { title: 'Bridge Construction', location: 'Toronto', image: '/images/bridge.webp', id: 6 },
  { title: 'High-Rise Development', location: 'Vancouver', image: '/images/highrise.jpg', id: 7 },
  { title: 'Highway Expansion', location: 'Montreal', image: '/images/highway.jpg', id: 8 },
  { title: 'Oil Pipeline Repair', location: 'Alberta', image: '/images/pipeline.jpg', id: 9 },
  { title: 'Park Restoration', location: 'Ottawa', image: '/images/park.jpeg', id: 10 },
  { title: 'School Construction', location: 'Quebec City', image: '/images/school.png', id: 11 }
];

export default function UserProjectDir() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    // when backend is done connect this part with backend
    console.log("Search Query:", searchQuery, "Date:", selectedDate);
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
        <Title level={1}>Project Directory</Title>
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
                placeholder="Search projects..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '300px' }}
              />
            </Form.Item>

            <Form.Item>
              <Select
                defaultValue="Active"
                style={{ width: 120 }}
                allowClear
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' }]}
                placeholder="select it"
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


        
        {/* Container with active projects */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '60vh',
          width: '80%',
          margin: '20px auto',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
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
                  onClick={() => navigate(`/projectDirectory/projectOverview/${project.id}`, { state: { project } })}
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