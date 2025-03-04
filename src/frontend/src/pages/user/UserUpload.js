import React, { useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import { Input, Typography, DatePicker, Button, Form, Select, Tag, Flex, Image, Modal, Slider, message } from "antd";
import { PlusOutlined, RotateLeftOutlined, RotateRightOutlined, ExclamationCircleOutlined, CalendarOutlined, DownOutlined } from '@ant-design/icons';
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
    const MAX_FILES = 100;

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
        padding: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '12px',
        width: '100%'
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
            const totalFiles = prevFiles.length + selectedFiles.length;

            if (totalFiles > MAX_FILES) {
                message.error(`You can only upload up to ${MAX_FILES} images. You tried adding ${totalFiles}.`);
                return prevFiles;
            }

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
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', padding: '20px', gap: '20px' }}>
            {/* Left section (image uploading)*/}
            <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
                <Box sx={{
                    textAlign: 'center',
                    padding: 4,
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}>
                    <h2>Upload & Edit Files</h2>
                    <p style={{ color: files.length >= MAX_FILES ? 'red' : 'black' }}>
                        {files.length}/{MAX_FILES} images uploaded
                    </p>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <Button icon={<PlusOutlined />} type="primary" color="cyan" variant="solid" onClick={() => fileInputRef.current.click()} disabled={files.length >= MAX_FILES}>
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

            </Box>

            {/* Right section (metadata) */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', padding: '30px' }}>
                <Box sx={metadataBoxStyle}>
                    <Title level={5}>Project Name:</Title>
                    <Input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Enter project name"
                    />
                </Box>

                <Box sx={metadataBoxStyle}>
                    <Title level={5}>Add Metadata:</Title>
                    <Input
                        placeholder="ex. bridge"
                        value={metadataTagsInput}
                        onChange={(e) => setMetadataTagsInput(e.target.value)}
                        onPressEnter={handleMetadataTagAdd}
                    />
                    <Flex wrap="wrap" style={{ marginTop: '10px' }}>
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
                    <Title level={5}>Adjust Resolution:</Title>
                    <Select
                        placeholder="Select resolution"
                        style={{ width: '100%' }}
                        options={[
                            { value: 'low', label: 'Low' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'high', label: 'High' }
                        ]}
                        suffixIcon={<DownOutlined />}
                    />
                </Box>

                <Box sx={metadataBoxStyle}>
                    <Title level={5}>Add Date:</Title>
                    <DatePicker
                        placeholder="Select date"
                        onChange={(date, dateString) => setSelectedDate(dateString)}
                        suffixIcon={<CalendarOutlined />}
                        style={{ width: '100%' }}
                    />
                </Box>

                <Box sx={metadataBoxStyle}>
                    <Title level={5}>Location:</Title>
                    <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                    />
                </Box>
            </Box>

        </Box>
    );
}