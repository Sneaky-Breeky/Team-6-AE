import React, { useState } from 'react';
import { Typography, Input, Form, Button, Tag } from "antd"
import Box from '@mui/material/Box';

const { Title } = Typography;

export default function CreateProjectDirectory() {
    const [projectName, setProjectName] = useState(null);
    const [description, setDescription] = useState(null);
    const [location, setLocation] = useState(null);
    const [defaultMetadataInputs, setDefaultMetadataInputs] = useState();
    const [defaultMetadataTags, setDefaultMetadataTags] = useState();

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
                <Title level={1}>Create Project Directories</Title>
            </Box>

            {/* Main content */}
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                }}
            >
                {/* Container with inputs */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'left',
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
                    <Title level={5}>Project name:</Title>
                    <Form.Item>
                        <Input
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </Form.Item>

                    <Title level={5}>Description:</Title>
                    <Form.Item>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Item>

                    <Title level={5}>Location:</Title>
                    <Form.Item>
                        <Input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Item>

                    <Title level={5}>Default Metadata Inputs:</Title>
                    <Form.Item>
                        <Input
                            value={defaultMetadataInputs}
                            onChange={(e) => setDefaultMetadataInputs(e.target.value)}
                        />
                    </Form.Item>

                    {/*TODO: TAGS GO HERE*/}
                    

                    <Title level={5}>Default Metadata Tags:</Title>
                    <Form.Item>
                        <Input
                            value={defaultMetadataTags}
                            onChange={(e) => setDefaultMetadataTags(e.target.value)}
                        />
                    </Form.Item>

                    {/*TODO: TAGS GO HERE*/}

                    <Button style={{ marginTop: "5%", padding: "3%"}} type="primary" htmlType="button" color="cyan" variant="solid" >
                        Add Project
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}