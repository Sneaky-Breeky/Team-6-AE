import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Input, Typography, DatePicker, Button, Form, Select } from "antd";
import { CalendarOutlined } from '@ant-design/icons';

const { Title } = Typography;

//TODO : some of the boxes use the same formatting as UserDashboard.js, best to abstract styles

export default function UserDashboard() {
    const [projectName, setProjectName] = useState(null);
    const [metadataTags, setMetadataTags] = useState(null);
    const [location, setLocation] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const metadataBoxStyle = {
        textAlign: 'left',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        paddingLeft: 2,
        paddingRight: 2,
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
                <Title level={1}>Upload Files</Title>
            </Box>

            {/* Main content */}
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                }}
            >
                {/* Left container for upload */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        width: '60%',
                        minWidth: '150px',
                        overflow: 'hidden',
                        padding: 4,
                        paddingRight: 2,
                    }}
                >
                    <Title level={3} style={{ textAlign: 'left' }}>
                        Upload File
                    </Title>

                    {/* File Upload Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            width: '100%',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {/*Drag and Drop area*/}
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: 8,
                            }}>
                            <Title level={3}>
                                Drag and drop files here*
                            </Title>
                            <Title level={4}>
                                or
                            </Title>
                            <Button style={{ margin: '10%' }} type="primary" htmlType="button" color="cyan" variant="solid" >
                                + Add Files
                            </Button>
                        </Box>
                        {/*Constraint Info*/}
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: 1,
                            }}>
                            <Title level={4}>
                                Supports jpeg, png, mp4, raw
                            </Title>
                            <Title level={5}>
                                Maximum 100 files per upload*
                            </Title>
                        </Box>
                    </Box>
                </Box>

                {/* Right container for metadata */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: 2,
                        width: '30%',
                        minWidth: '150px',
                        overflow: 'hidden',
                        padding: 4,
                        paddingLeft: 2,
                    }}
                >
                    {/*Project Name Box*/}
                    <Box sx={metadataBoxStyle}>
                        <Title level={5}>Project name</Title>
                        <Form.Item>
                            <Input
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </Form.Item>
                    </Box>

                    {/*Metadata Tags Box*/}
                    <Box sx={metadataBoxStyle}>
                        <Title level={5}>Add metadata:</Title>
                        <Form.Item>
                            <Input
                                placeholder="ex. bridge"
                                value={metadataTags}
                                onChange={(e) => setMetadataTags(e.target.value)}
                            />
                        </Form.Item>
                    </Box>

                    {/*Resolution Box*/}
                    <Box sx={metadataBoxStyle}>
                        <Title level={5}>Adjust resolution:</Title>
                        <Form.Item>
                            <Select options={
                                [{ value: 'low', label: <span>Low</span> },
                                { value: 'medium', label: <span>Medium</span> },
                                { value: 'high', label: <span>High</span> }]} />
                        </Form.Item>
                    </Box>

                    {/*Date Box*/}
                    <Box sx={metadataBoxStyle}>
                        <Title level={5}>Add date:</Title>
                        <Form.Item>
                            <DatePicker
                                placeholder="Select date"
                                onChange={(date, dateString) => setSelectedDate(dateString)}
                                suffixIcon={<CalendarOutlined />}
                            />
                        </Form.Item>
                    </Box>

                    {/*Location Box*/}
                    <Box sx={metadataBoxStyle}>
                        <Title level={5}>Location:</Title>
                        <Form.Item>
                            <Input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Form.Item>
                    </Box>

                    <Button type="primary" htmlType="button" color="cyan" variant="solid" >
                        Upload files to Project
                    </Button>
                </Box>
            </Box>
        </Box>
    )
};
