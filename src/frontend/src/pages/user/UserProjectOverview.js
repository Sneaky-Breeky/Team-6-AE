import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Input, Button, DatePicker, Form, Typography, Card, Row, Col, Select, Space, Image } from 'antd';
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
    DeleteOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Meta } = Card;

const initialImageList = [
    '/images/bridge.webp',
    '/images/highrise.jpg',
    '/images/highway.jpg',
    '/images/pipeline.jpg',
    '/images/park.jpeg',
    '/images/school.png',
    '/images/bridge.webp',
    '/images/highrise.jpg',
    '/images/highway.jpg',
    '/images/pipeline.jpg',
    '/images/park.jpeg',
    '/images/school.png',
];


export default function UserProjectOverview() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const [current, setCurrent] = React.useState(0);
    const { state } = useLocation();
    const [imageList, setImageList] = useState(initialImageList);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedImages, setSelectedImages] = useState(new Set());


    if (!state?.project) {
        return <p>Project not found.</p>;
    }

    const handleSearch = () => {
        // when backend is done connect this part with backend
        console.log("Search Query:", searchQuery, "Date:", selectedDate);
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

    const toggleSelectImage = (image) => {
        if (!isEditMode) return;

        const updatedSelection = new Set(selectedImages);
        if (updatedSelection.has(image)) {
            updatedSelection.delete(image);
        } else {
            updatedSelection.add(image);
        }
        setSelectedImages(updatedSelection);
    };

    const deleteSelectedImages = () => {
        setImageList(imageList.filter((img) => !selectedImages.has(img)));
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
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                {/* Edit button */}
                <Box sx={{ textAlign: 'center', padding: 4 }}>
                    <Button type="primary" onClick={toggleEditMode} danger={isEditMode} style={{ marginTop: '10px' }}>
                        {isEditMode ? "Cancel Edit Mode" : "Edit Images"}
                    </Button>
                </Box>

                {/* Image gallery*/}
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    {isEditMode ? (
                        <Space wrap size={16} style={{ justifyContent: 'center' }}>
                            {imageList.map((image) => (
                                <div
                                    key={image}
                                    style={{ position: 'relative', cursor: 'pointer' }}
                                    onClick={() => toggleSelectImage(image)}
                                >
                                    <Image
                                        src={image}
                                        width={200}
                                        preview={false}
                                        style={{
                                            border: selectedImages.has(image) ? '4px solid red' : 'none',
                                            borderRadius: '8px',
                                            transition: '0.2s ease-in-out',
                                        }}
                                    />
                                    {selectedImages.has(image) && (
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

                                {imageList.map((image) => (
                                    <Image
                                        key={image}
                                        src={image}
                                        width={200}
                                    />
                                ))}
                            </Space>
                        </Image.PreviewGroup>
                    )}
                </Box>


                {/* Delete button */}
                {isEditMode && selectedImages.size > 0 && (
                    <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button type="primary" danger onClick={deleteSelectedImages}>
                            Delete Selected Images
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}