import React, { useState } from 'react';
import { Typography, Input, Form, Button, Tag, Flex } from "antd"
import Box from '@mui/material/Box';

const { Title } = Typography;

const tagStyle = {
    backgroundColor: '#dbdbdb'
};

export default function ProjectCreation() {
    const [projectName, setProjectName] = useState(null);
    const [description, setDescription] = useState(null);
    const [location, setLocation] = useState(null);
    const [defaultMetadataInputsInput, setDefaultMetadataInputsInput] = useState();
    const [defaultMetadataInputs, setDefaultMetadataInputs] = useState([]);
    const [defaultMetadataTagInput, setDefaultMetadataTagInput] = useState();
    const [defaultMetadataTags, setDefaultMetadataTags] = useState([]);

    const handleMetadataTagClose = (removedTag) => {
        const newTags = defaultMetadataTags.filter((tag) => tag !== removedTag);
        setDefaultMetadataTags(newTags);
    }

    const handleMetadataTagAdd = () => {
        if (defaultMetadataTagInput && !defaultMetadataTags.includes(defaultMetadataTagInput)) {
            setDefaultMetadataTags([...defaultMetadataTags, defaultMetadataTagInput]);
        }
        setDefaultMetadataTagInput("");
    }

    const handleMetadataInputClose = (removedInput) => {
        const newInputs = defaultMetadataInputs.filter((tag) => tag !== removedInput);
        setDefaultMetadataInputs(newInputs);
    }

    const handleMetadataInputAdd = () => {
        if (defaultMetadataInputsInput && !defaultMetadataInputs.includes(defaultMetadataInputsInput)) {
            setDefaultMetadataInputs([...defaultMetadataInputs, defaultMetadataInputsInput]);
        }
        setDefaultMetadataInputsInput("");
    }

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
                        height: '80vh',
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
                            value={defaultMetadataInputsInput}
                            onChange={(e) => setDefaultMetadataInputsInput(e.target.value)}
                            onPressEnter={(e) => handleMetadataInputAdd(e.target.value)}
                        />
                    </Form.Item>
                    <Flex gap="4px 0" wrap>
                        {defaultMetadataInputs.map((tag) => (
                            <Tag
                                style={tagStyle}
                                key={tag}
                                closable={true}
                                onClose={() => handleMetadataInputClose(tag)}
                            >
                                {tag}
                            </Tag>
                        ))
                        }
                    </Flex>

                    <Title level={5}>Default Metadata Tags:</Title>
                    <Form.Item>
                        <Input
                            value={defaultMetadataTagInput}
                            onChange={(e) => setDefaultMetadataTagInput(e.target.value)}
                            onPressEnter={(e) => handleMetadataTagAdd(e.target.value)}
                        />
                    </Form.Item>
                    <Flex gap="4px 0" wrap>
                        {defaultMetadataTags.map((tag) => (
                            <Tag
                                style={tagStyle}
                                key={tag}
                                closable={true}
                                onClose={() => handleMetadataTagClose(tag)}
                            >
                                {tag}
                            </Tag>
                        ))
                        }
                    </Flex>

                    <Button style={{ marginTop: "5%", padding: "3%" }} type="primary" htmlType="button" color="cyan" variant="solid" >
                        Add Project
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}