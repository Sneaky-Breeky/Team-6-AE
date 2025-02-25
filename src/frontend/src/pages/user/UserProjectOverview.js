import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Input, Button, DatePicker, Form, Typography, Card, Row, Col, Select, Space, Image, Popconfirm } from 'antd';
import {
    SearchOutlined,
    CalendarOutlined,
    DownloadOutlined,
    LeftOutlined,
    RightOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    UndoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
    DeleteOutlined,
    EditOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Meta } = Card;

// when connecting backend, each image should have its own id, so then instead we can use
// the image.id instead of index to map the images and select/delete them.

const files = [
    { Id: 0, FileName: "Bridge Construction", FilePath: '/images/bridge.webp', Metadata: ["bridge", "construction"], ProjectId: 0, Status: "Active", Date: dayjs("2024-09-10 00:16:01") },
    { Id: 1, FileName: "High-Rise Development", FilePath: '/images/highrise.jpg', Metadata: ["high-rise", "high rise", "highrise", "construction"], ProjectId: 0, Status: "Active", Date: dayjs("2024-12-28 00:16:01") },
    { Id: 2, FileName: "Highway Expansion", FilePath: '/images/highway.jpg', Metadata: ["highway", "expansion", "road"], ProjectId: 0, Status: "Active", Date: dayjs("2024-10-14 00:16:01") },
    { Id: 3, FileName: "Oil Pipeline Repair", FilePath: '/images/pipeline.jpg', Metadata: ["oil", "pipeline", "pipeline repair"], ProjectId: 1, Status: "Active", Date: dayjs("2024-11-07 00:16:01") },
    { Id: 4, FileName: "Park Restoration", FilePath: '/images/park.jpeg', Metadata: ["park", "construction"], ProjectId: 1, Status: "Active", Date: dayjs("2025-01-31 00:16:01") },
    { Id: 5, FileName: "School Construction", FilePath: '/images/school.png', Metadata: ["school", "construction"], ProjectId: 2, Status: "Active", Date: dayjs("2024-12-18 00:16:01") },
    { Id: 6, FileName: "Bridge Construction", FilePath: '/images/bridge.webp', Metadata: ["bridge", "construction"], ProjectId: 2, Status: "Active", Date: dayjs("2025-01-09 00:16:01") },
    { Id: 7, FileName: "High-Rise Development", FilePath: '/images/highrise.jpg', Metadata: ["high-rise", "high rise", "highrise", "construction"], ProjectId: 2, Status: "Active", Date: dayjs("2024-12-12 00:16:01") },
    { Id: 8, FileName: "Highway Expansion", FilePath: '/images/highway.jpg', Metadata: ["highway", "expansion", "road"], ProjectId: 2, Status: "Active", Date: dayjs("2024-09-13 00:16:01") },
    { Id: 9, FileName: "Oil Pipeline Repair", FilePath: '/images/pipeline.jpg', Metadata: ["oil", "pipeline", "pipeline repair"], ProjectId: 3, Status: "Archived", Date: dayjs("2024-12-31 00:16:01") },
    { Id: 10, FileName: "Park Restoration", FilePath: '/images/park.jpeg', Metadata: ["park", "construction"], ProjectId: 3, Status: "Active", Date: dayjs("2025-01-18 00:16:01") },
    { Id: 11, FileName: "School Construction", FilePath: '/images/school.png', Metadata: ["school", "construction"], ProjectId: 3, Status: "Archived", Date: dayjs("2024-12-04 00:16:01") }
];


export default function UserProjectOverview() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const [current, setCurrent] = React.useState(0);
    const { state } = useLocation();
    const [imageList, setImageList] = useState(files);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedImages, setSelectedImages] = useState(new Set());
    const [selectedStatus, setSelectedStatus] = useState("Active");



    if (!state?.project) {
        return <p>Project not found.</p>;
    }


    // when backend is done connect this part with backend
    const handleSearch = () => {
        let filteredImages = files;

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filteredImages = filteredImages.filter(file =>
                file.Metadata.some(tag => tag.toLowerCase().includes(query))
            );
        }

        if (selectedDate) {
            filteredImages = filteredImages.filter(file =>
                dayjs(file.Date).isSame(selectedDate, 'day')
            );
        }

        if (selectedStatus) {
            filteredImages = filteredImages.filter(file =>
                file.Status.toLowerCase() === selectedStatus.toLowerCase()
            );
        }

        setImageList(filteredImages);
        console.log("Filtered images:", filteredImages);
    };


    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedDate(null);
        setSelectedStatus('Active');
        setImageList(files); // Reset to original list
    };


    const onDownload = () => {
        const url = imageList[current];
        const suffix = url.slice(url.lastIndexOf('.'));
        const filename = Date.now() + suffix;

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const blobUrl = URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(blobUrl);
                link.remove();
            });
    };

    const toggleEditMode = () => {
        setIsEditMode((prev) => !prev);
        setSelectedImages(new Set());
    };

    const toggleSelectImage = (index) => {
        if (!isEditMode) return;

        const updatedSelection = new Set(selectedImages);
        if (updatedSelection.has(index)) {
            updatedSelection.delete(index);
        } else {
            updatedSelection.add(index);
        }
        setSelectedImages(updatedSelection);
    };

    const deleteSelectedImages = () => {
        setImageList(imageList.filter((_, index) => !selectedImages.has(index)));
        setSelectedImages(new Set());
        setIsEditMode(false);
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    padding: 6,
                    textAlign: 'center',
                }}
            >
                {/* Project info card at the top left */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        marginLeft: '40px',
                        marginTop: '20px'
                    }}
                >
                    <Card
                        hoverable
                        style={{
                            backgroundColor: '#37474F',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            width: '250px',
                            color: 'white',
                            boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <Meta
                            title={<span style={{ color: 'white', fontWeight: 'bold' }}>{state.project.title}</span>}
                            description={<span style={{ color: 'white' }}>{state.project.location}</span>}
                            style={{ textAlign: 'center' }}
                        />
                    </Card>
                </Box>

                {/* Title */}
                <Title level={1} style={{ margin: '0 auto', textAlign: 'center' }}>Project Overview</Title>
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
                            placeholder="Search images by key word..."
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
                                { value: 'archived', label: 'Archived' }]}
                            onChange={(value) => setSelectedStatus(value)}
                            placeholder="Select status"
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

                    <Form.Item>
                        <Button type="default" onClick={handleClearFilters} danger>
                            Clear Filters
                        </Button>
                    </Form.Item>
                </Form>
            </Box>



            {/* Main content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                {/* Edit button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: 2, paddingLeft: '60px', gap: '10px' }}>
                    <Button
                        onClick={toggleEditMode}
                        danger={isEditMode}
                        icon={<EditOutlined />}
                    >
                        {isEditMode ? "Cancel Edit Mode" : "Edit Gallery"}
                    </Button>
                    {/* Delete button */}
                    {isEditMode && selectedImages.size > 0 && (
                        <Popconfirm
                            title="Delete Images"
                            description="Are you sure you want to delete the selected images?"
                            onConfirm={deleteSelectedImages}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger icon={<DeleteOutlined />}>
                                Delete
                            </Button>
                        </Popconfirm>
                    )}
                </Box>

                {/* Image gallery*/}
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    {isEditMode ? (
                        <Space wrap size={16} style={{ justifyContent: 'center' }}>
                            {imageList.map((file) => (
                                <div
                                    key={file.Id}
                                    style={{ position: 'relative', cursor: 'pointer' }}
                                    onClick={() => toggleSelectImage(file.Id)}
                                >
                                    <Image
                                        src={file.FilePath}
                                        width={200}
                                        preview={false}
                                        style={{
                                            border: selectedImages.has(file.Id) ? '4px solid red' : 'none',
                                            borderRadius: '8px',
                                            transition: '0.2s ease-in-out',
                                        }}
                                    />
                                    {selectedImages.has(file.Id) && (
                                        <DeleteOutlined
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                right: 5,
                                                color: 'white',
                                                background: 'red',
                                                borderRadius: '50%',
                                                padding: '5px',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                            }}
                                        />
                                    )}
                                </div>
                            ))}

                        </Space>
                    ) : (
                        <Image.PreviewGroup
                            preview={{
                                toolbarRender: (_, { transform: { scale }, actions }) => (
                                    <Space size={12} className="toolbar-wrapper">
                                        <LeftOutlined onClick={() => actions.onActive?.(-1)} />
                                        <RightOutlined onClick={() => actions.onActive?.(1)} />
                                        <DownloadOutlined onClick={onDownload} />
                                        <SwapOutlined rotate={90} onClick={actions.onFlipY} />
                                        <SwapOutlined onClick={actions.onFlipX} />
                                        <RotateLeftOutlined onClick={actions.onRotateLeft} />
                                        <RotateRightOutlined onClick={actions.onRotateRight} />
                                        <ZoomOutOutlined disabled={scale === 1} onClick={actions.onZoomOut} />
                                        <ZoomInOutlined disabled={scale === 50} onClick={actions.onZoomIn} />
                                        <UndoOutlined onClick={actions.onReset} />
                                    </Space>
                                ),
                                onChange: (index) => setCurrent(index),
                            }}
                        >
                            <Space wrap size={16} style={{ justifyContent: 'center' }}>

                                {imageList.map((file) => (
                                    <Image
                                        key={file.Id}
                                        src={file.FilePath}
                                        width={200}
                                    />
                                ))}
                            </Space>
                        </Image.PreviewGroup>
                    )}
                </Box>
            </Box>
        </Box>
    );
}