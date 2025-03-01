import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Input, Button, DatePicker, Form, Typography, Card, Row, Col, } from 'antd';
import { SearchOutlined, CalendarOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../utils/dummyData.js';
import SideMenu from '../../components/SideMenu.js';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Meta } = Card;


export default function UserDashboard() {
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
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: 2,
            width: '20%',
            minWidth: '150px',
            padding: 2,
          }}
        >

          <Box
            onClick={() => {
              sessionStorage.setItem('menu', 2);
              navigate('/user/uploadFiles');
            }}
            sx={{
              textAlign: 'center',
              width: 200,
              height: 160,
              backgroundColor: 'grey.300',
              border: 1,
              borderColor: 'grey.500',
              borderRadius: '16px',
              '&:hover': { boxShadow: 3 },
            }}
          >
            <PlusOutlined style={{ marginTop: '30px', fontSize: '50px' }} />
            <h4>Upload Images/Videos</h4>
          </Box>

          <Box
            onClick={() => {
              sessionStorage.setItem('menu', 3);
              navigate('/user/activityLog');
            }}
            sx={{
              textAlign: 'center',
              width: 200,
              height: 160,
              backgroundColor: 'grey.300',
              border: 1,
              borderColor: 'grey.500',
              borderRadius: '16px',
              '&:hover': { boxShadow: 3 },
            }}
          >
            <UnorderedListOutlined style={{ marginTop: '30px', fontSize: '50px' }} />
            <h4>Activity Log</h4>
          </Box>
        </Box>



        {/* Right container with active projects */}
        <Box
          onClick={() => {
            sessionStorage.setItem('menu', 1);
            navigate('/user/projectDirectory');
          }}
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
            '&:hover': { boxShadow: 3},
          }}
        >
          <Title level={3} style={{ textAlign: 'center', marginBottom: '30px', marginTop: '0px' }}>
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
                        alt={project.name}
                        src={project.thumbnail}
                        style={{ height: '80px', objectFit: 'cover' }}
                      />
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      sessionStorage.setItem('menu', 1);
                      navigate(`/projectDirectory/projectOverview/${project.id}`, { state: { project } })
                      window.location.reload(); // TODO: this'll cause issues on the deployment build, find alternative
                    }}
                    style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <Meta
                      title={project.name}
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