import dayjs from 'dayjs';

const projects = [
    {
        id: 0,
        name: 'Bridge Construction', 
        location: 'Toronto', 
        date: dayjs("2024-12-18 00:16:01"),
        thumbnail: '/images/bridge.webp', 
        accessLevel: 'Admins Only', 
        listUsers: [], 
        status: null,
        phase: 2,
        lastUpdated: dayjs("2025-01-18 00:16:01"),
        files: Array(10).fill({ FileName: "Bridge Construction", FilePath: '/images/bridge.webp' })
    },
    {
        id: 1,
        name: 'High-Rise Development',
        location: 'Vancouver',
        date: dayjs("2024-12-28 00:16:01"),
        thumbnail: '/images/highrise.jpg',
        accessLevel: 'Everyone',
        listUsers: [],
        status: 'Active',
        phase: 1,
        lastUpdated: dayjs("2025-01-12 00:16:01"),
        files: Array(10).fill({ FileName: "High-Rise Development", FilePath: '/images/highrise.jpg' })
    },
    {
        id: 2,
        name: 'Highway Expansion',
        location: 'Montreal',
        date: dayjs("2024-10-14 00:16:01"),
        thumbnail: '/images/highway.jpg',
        accessLevel: 'Selected Users',
        listUsers: ['John Doe', 'Sarah Brown'],
        status: 'Inactive',
        phase: 3,
        lastUpdated: dayjs("2025-01-10 00:16:01"),
        files: Array(10).fill({ FileName: "Highway Expansion", FilePath: '/images/highway.jpg' })
    },
    {
        id: 3,
        name: 'Oil Pipeline Repair',
        location: 'Alberta',
        date: dayjs("2024-11-07 00:16:01"),
        thumbnail: '/images/pipeline.jpg',
        accessLevel: 'Everyone',
        listUsers: [],
        status: 'Active',
        phase: 1,
        lastUpdated: dayjs("2025-01-05 00:16:01"),
        files: Array(10).fill({ FileName: "Oil Pipeline Repair", FilePath: '/images/pipeline.jpg' })
    },
    {
        id: 4,
        name: 'Park Restoration',
        location: 'Ottawa',
        date: dayjs("2025-01-31 00:16:01"),
        thumbnail: '/images/park.jpeg',
        accessLevel: 'Everyone',
        listUsers: [],
        status: 'Active',
        phase: 2,
        lastUpdated: dayjs("2025-01-20 00:16:01"),
        files: Array(10).fill({ FileName: "Park Restoration", FilePath: '/images/park.jpeg' })
    },
    {
        id: 5,
        name: 'School Construction',
        location: 'Quebec City',
        date: dayjs("2024-12-18 00:16:01"),
        thumbnail: '/images/school.png',
        accessLevel: 'Everyone',
        listUsers: [],
        status: 'Active',
        phase: 1,
        lastUpdated: dayjs("2025-01-08 00:16:01"),
        files: Array(10).fill({ FileName: "School Construction", FilePath: '/images/school.png' })
    },
    {
        id: 6,
        name: 'Airport Expansion',
        location: 'Calgary',
        date: dayjs("2024-11-22 00:16:01"),
        thumbnail: '/images/airport.jpg',
        accessLevel: 'Admins Only',
        listUsers: [],
        status: 'Active',
        phase: 2,
        lastUpdated: dayjs("2025-01-15 00:16:01"),
        files: Array(10).fill({ FileName: "Airport Expansion", FilePath: '/images/airport.jpg' })
    },
    {
        id: 7,
        name: 'Hospital Renovation',
        location: 'Winnipeg',
        date: dayjs("2024-09-30 00:16:01"),
        thumbnail: '/images/hospital.jpg',
        accessLevel: 'Selected Users',
        listUsers: ['Sarah Brown'],
        status: 'Inactive',
        phase: 1,
        lastUpdated: dayjs("2025-01-10 00:16:01"),
        files: Array(10).fill({ FileName: "Hospital Renovation", FilePath: '/images/hospital.jpg' })
    },
    {
        id: 8,
        name: 'Railway Modernization',
        location: 'Halifax',
        date: dayjs("2024-07-10 00:16:01"),
        thumbnail: '/images/railway.jpg',
        accessLevel: 'Everyone',
        listUsers: [],
        status: 'Active',
        phase: 2,
        lastUpdated: dayjs("2025-01-12 00:16:01"),
        files: Array(10).fill({ FileName: "Railway Modernization", FilePath: '/images/railway.jpg' })
    },
    {
        id: 9,
        name: 'Water Treatment Plant',
        location: 'Regina',
        date: dayjs("2024-06-22 00:16:01"),
        thumbnail: '/images/waterplant.jpg',
        accessLevel: 'Selected Users',
        listUsers: ['John Doe'],
        status: 'Inactive',
        phase: 3,
        lastUpdated: dayjs("2025-01-10 00:16:01"),
        files: Array(10).fill({ FileName: "Water Treatment Plant", FilePath: '/images/waterplant.jpg' })
    },
    {
        id: 11,
        name: 'Underground Parking Facility',
        location: 'Mississauga',
        date: dayjs("2024-05-05 00:16:01"),
        thumbnail: '/images/parking.jpg',
        accessLevel: 'Everyone',
        listUsers: [],
        status: 'Active',
        phase: 1,
        lastUpdated: dayjs("2025-01-08 00:16:01"),
        files: Array(10).fill({ FileName: "Underground Parking Facility", FilePath: '/images/parking.jpg' })
    },
    {
        id: 12,
        name: 'Renewable Energy Farm',
        location: 'Saskatoon',
        date: dayjs("2024-04-12 00:16:01"),
        thumbnail: '/images/solar.jpg',
        accessLevel: 'Everyone',
        listUsers: [],
        status: 'Active',
        phase: 2,
        lastUpdated: dayjs("2025-01-05 00:16:01"),
        files: Array(10).fill({ FileName: "Renewable Energy Farm", FilePath: '/images/solar.jpg' })
    }
];


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

const logs = [
    { time: new Date(2025, 1, 3, 7, 59), action: 'File uploaded' },
    { time: new Date(2025, 1, 3, 7, 53), action: 'Files submitted to a project' },
    { time: new Date(2025, 1, 2, 18, 30), action: 'Project metadata updated' },
    { time: new Date(2025, 1, 2, 16, 12), action: 'File downloaded' },
    { time: new Date(2025, 1, 2, 12, 2), action: 'Files shared' },
    { time: new Date(2025, 1, 1, 13, 3), action: 'File uploaded' },
    { time: new Date(2025, 0, 31, 11, 45), action: 'Files submitted to a project' },
    { time: new Date(2025, 0, 30, 15, 50), action: 'Project metadata updated' },
    { time: new Date(2025, 0, 30, 10, 27), action: 'File downloaded' },
    { time: new Date(2025, 0, 29, 7, 22), action: 'Files shared' },
    { time: new Date(2025, 0, 27, 14, 14), action: 'Files shared' },
    { time: new Date(2025, 0, 26, 8, 15), action: 'File uploaded' },
];


const users = [
    { name: 'John Doe', email: 'johndoe123@example.com', role: 'User', status: 'Active' },
    { name: 'Sarah Brown', email: 'sarah.brown@example.com', role: 'Admin', status: 'Active' },
    { name: 'Michael Johnson', email: 'michael.j2009@example.com', role: 'User', status: 'Inactive' }
];

export { projects, files, logs, users };