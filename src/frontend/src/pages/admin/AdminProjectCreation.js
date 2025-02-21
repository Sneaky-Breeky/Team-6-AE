import React, { useState } from 'react';
import { Typography, Input, Form, Button, Tag, Flex, message } from "antd"
import Box from '@mui/material/Box';

const { Title } = Typography;

const tagStyle = {
    backgroundColor: '#dbdbdb'
};

export default function ProjectCreation() {
    const [projectName, setProjectName] = useState(null);
    const [description, setDescription] = useState(null);
    const [location, setLocation] = useState(null);
    const [defaultMetadataFieldsField, setDefaultMetadataFieldsField] = useState();
    const [defaultMetadataFields, setDefaultMetadataFields] = useState([]);
    const [defaultMetadataTagInput, setDefaultMetadataTagInput] = useState();
    const [defaultMetadataTags, setDefaultMetadataTags] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

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

    const handleMetadataFieldClose = (removedField) => {
        const newFields = defaultMetadataFields.filter((tag) => tag !== removedField);
        setDefaultMetadataFields(newFields);
    }

    const handleMetadataFieldAdd = () => {
        if (defaultMetadataFieldsField && !defaultMetadataFields.includes(defaultMetadataFieldsField)) {
            setDefaultMetadataFields([...defaultMetadataFields, defaultMetadataFieldsField]);
        }
        setDefaultMetadataFieldsField("");
    }

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Project Added',
        });
      };

    const handleAddProjectButton = () => {
        success();
        // create new project w current input data, connect w backend here
        setDefaultMetadataFields([]);
        setDefaultMetadataTags([]);
        setProjectName(null);
        setDescription(null);
        setLocation(null);
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
                        width: '50%',
                        height: "fit-content",
                        margin: '20px auto',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '10px',
                        padding: '20px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                    }}
                >
                    <Title level={5} style={{ marginTop: '10px' }}>Project name:</Title>
                    <Form.Item style={{ marginBottom: '0px' }}>
                        <Input
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </Form.Item>

                    <Title level={5} style={{ marginTop: '10px' }}>Description:</Title>
                    <Form.Item style={{ marginBottom: '0px' }}>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Item>

                    <Title level={5} style={{ marginTop: '10px' }}>Location:</Title>
                    <Form.Item style={{ marginBottom: '0px' }}>
                        <Input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Item>

                    <Title level={5} style={{ marginTop: '10px' }}>Default Metadata Fields:</Title>
                    <Form.Item>
                        <Input
                            placeholder="ex. Date"
                            value={defaultMetadataFieldsField}
                            onChange={(e) => setDefaultMetadataFieldsField(e.target.value)}
                            onPressEnter={(e) => handleMetadataFieldAdd(e.target.value)}
                        />
                    </Form.Item>
                    <Flex gap="4px 0" wrap>
                        {defaultMetadataFields.map((tag) => (
                            <Tag
                                style={tagStyle}
                                key={tag}
                                closable={true}
                                onClose={() => handleMetadataFieldClose(tag)}
                            >
                                {tag}
                            </Tag>
                        ))
                        }
                    </Flex>

                    <Title level={5} style={{ marginTop: '10px' }}>Default Metadata Tags:</Title>
                    <Form.Item>
                        <Input
                            placeholder="ex. bridge"
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
                    {contextHolder}
                    <Button onClick={handleAddProjectButton} style={{ marginTop: "10px", padding: "3%" }} type="primary" htmlType="button" color="cyan" variant="solid" >
                        Add Project
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}