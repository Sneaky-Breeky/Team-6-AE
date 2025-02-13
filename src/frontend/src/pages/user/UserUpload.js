import Box from '@mui/material/Box';
import { Typography, Button } from "antd";
const { Title } = Typography;

//TODO : some of the boxes use the same formatting as UserDashboard.js, best to abstract styles

export default function UserDashboard() {
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
                    padding: 4,
                }}
            >
                {/* Left container for upload */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: 2,
                        width: '60%',
                        minWidth: '150px',
                        overflow: 'hidden',
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

            </Box>
        </Box>
    )
};
