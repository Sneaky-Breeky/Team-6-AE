import React, { useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import { Input, Typography, DatePicker, Button, Form, Select, Tag, Flex, Image, Modal, Slider, message } from "antd";
import { PlusOutlined, RotateLeftOutlined, RotateRightOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { CalendarOutlined } from '@ant-design/icons';
import Cropper from 'react-easy-crop';

const { Title } = Typography;
const { confirm } = Modal;

const tagStyle = {
    backgroundColor: '#dbdbdb',
    padding: '5px 10px',
    margin: '3px'
};

export default function UserUpload() {
    const [files, setFiles] = useState([]);
    const [croppedImages, setCroppedImages] = useState([]);
    const [currentFile, setCurrentFile] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [editing, setEditing] = useState(false);

    const [projectName, setProjectName] = useState(null);
    const [metadataTagsInput, setMetadataTagsInput] = useState();
    const [metadataTags, setMetadataTags] = useState([]);
    const [location, setLocation] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const fileInputRef = useRef(null);
    const metadataBoxStyle = {
        textAlign: 'left',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        paddingLeft: 2,
        paddingRight: 2,
    };

    const handleMetadataTagClose = (removedTag) => {
        const newTags = metadataTags.filter((tag) => tag !== removedTag);
        setMetadataTags(newTags);
    }

    const handleMetadataTagAdd = () => {
        if (metadataTagsInput && !metadataTags.includes(metadataTagsInput)) {
            setMetadataTags([...metadataTags, metadataTagsInput]);
        }
        setMetadataTagsInput("");
    }


    const showDuplicateAlert = (duplicates) => {
        message.warning(`Duplicate files ignored: ${duplicates.join(", ")}`);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files).map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setFiles((prevFiles) => {
            const existingFileNames = new Set(prevFiles.map(file => file.file.name));

            const newFiles = [];
            const duplicateFiles = [];

            selectedFiles.forEach(file => {
                if (existingFileNames.has(file.file.name)) {
                    duplicateFiles.push(file.file.name);
                } else {
                    newFiles.push(file);
                }
            });

            // Show alert for duplicate files
            if (duplicateFiles.length > 0) {
                showDuplicateAlert(duplicateFiles);
            }

            return [...prevFiles, ...newFiles];
        });
    };

    const handleEditImage = (file) => {
        setCurrentFile(file);
        setEditing(true);
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels);
    }, []);

    const saveEditedImage = () => {
        setCroppedImages([...croppedImages, currentFile]);
        setEditing(false);
        setCurrentFile(null);
    };

    const confirmRemoveFile = (fileName) => {
        if (!fileName || !fileName.file) {
            console.error("Invalid file object:", fileName);
            return;
        }

        confirm({
            title: 'Are you sure you want to remove this image?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Yes, remove',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                removeFile(fileName.file.name);
            }
        });
    };

    const removeFile = (fileName) => {
        setFiles(prevFiles => {
            const updatedFiles = prevFiles.filter(file => file.file.name !== fileName);
            return [...updatedFiles];
        });
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* File upload section */}
            <Box sx={{
                textAlign: 'center',
                padding: 4,
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
                <h2>Upload & Edit Files</h2>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <Button icon={<PlusOutlined />} type="primary" color="cyan" variant="solid" onClick={() => fileInputRef.current.click()}>
                    Add Files
                </Button>
            </Box>

            {/* Image preview & edit options */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 4 }}>
                {files.map(({ file, preview }, index) => (
                    <div key={index} style={{ position: 'relative', width: '150px' }}>
                        <Image src={preview} width={150} preview={false} />
                        <Button size="small" onClick={() => handleEditImage({ file, preview })}>Edit</Button>
                        <Button danger size="small" onClick={() => {
                            confirmRemoveFile(files[index]);
                        }}>
                            Remove
                        </Button>

                    </div>
                ))}
            </Box>

            {/* Image editor popup */}
            <Modal
                open={editing}
                onCancel={() => setEditing(false)}
                onOk={saveEditedImage}
                okText="Save Changes"
                title="Edit Image"
                width={600}
            >
                {currentFile && (
                    <div style={{ width: '100%', height: 400, position: 'relative' }}>
                        <Cropper
                            image={currentFile.preview}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
                            <Button icon={<RotateLeftOutlined />} onClick={() => setRotation(rotation - 90)} />
                            <Button icon={<RotateRightOutlined />} onClick={() => setRotation(rotation + 90)} />
                            <Slider min={1} max={3} step={0.1} value={zoom} onChange={setZoom} />
                        </Box>
                    </div>
                )}
            </Modal>

            {/* Upload button */}
            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="primary" color="cyan" variant="solid" disabled={files.length === 0}>
                    Upload Files to Project
                </Button>
            </Box>

            {/*  Metadata section option 1 */}
            {/* <Box
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
                <Box sx={metadataBoxStyle}>
                    <Title level={5}>Project name</Title>
                    <Form.Item>
                        <Input
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </Form.Item>
                </Box>

                <Box sx={metadataBoxStyle}>
                    <Title level={5}>Add metadata:</Title>
                    <Form.Item>
                        <Input
                            placeholder="ex. bridge"
                            value={metadataTagsInput}
                            onChange={(e) => setMetadataTagsInput(e.target.value)}
                            onPressEnter={() => handleMetadataTagAdd()}
                        />
                    </Form.Item>
                    <Flex style={{ marginBottom: "3%" }} gap="4px 0" wrap>
                        {metadataTags.map((tag) => (
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
                </Box>

                <Box sx={metadataBoxStyle}>
                    <Title level={5}>Adjust resolution:</Title>
                    <Form.Item>
                        <Select options={
                            [{ value: 'low', label: <span>Low</span> },
                            { value: 'medium', label: <span>Medium</span> },
                            { value: 'high', label: <span>High</span> }]} />
                    </Form.Item>
                </Box>

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
            </Box> */}


            {/* Metadata section option */}
            <Box sx={{ padding: 4 }}>
                <h3>Metadata Fields</h3>

                <Box>
                    <h5>Project Name</h5>
                    <input type="text" placeholder="Enter project name" />
                </Box>

                <Box>
                    <h5>Metadata Tags</h5>
                    <input type="text" placeholder="Enter metadata tags" />
                </Box>

                <Box>
                    <h5>Location</h5>
                    <input type="text" placeholder="Enter location" />
                </Box>
            </Box> 

        </Box>
    );
}