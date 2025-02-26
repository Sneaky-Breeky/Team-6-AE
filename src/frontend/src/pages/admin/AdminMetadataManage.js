import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Input } from 'antd';
import { SearchOutlined, EditOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import { projectsRenameToProjectsAfterUpdates } from '../../utils/dummyData.js';

const { Title } = Typography;

const projects = [
  {name: "School Construction", location: "Quebec City", date: dayjs("2024-12-18 00:16:01"), status: "", dept: ""},
  {name: "Bridge Construction", location: "Toronto", date: dayjs("2024-09-10 00:16:01"), status: "", dept: ""},
  {name: "High-rise Development", location: "Vancouver", date: dayjs("2024-12-28 00:16:01"), status: "", dept: ""},
  {name: "Highway Expansion", location: "Montreal", date: dayjs("2024-10-14 00:16:01"), status: "", dept: ""},
  {name: "Oil Pipeline Repair", location: "Alberta", date: dayjs("2024-11-07 00:16:01"), status: "", dept: ""},
  {name: "Park Restoration", location: "Ottawa", date: dayjs("2025-01-31 00:16:01"), status: "", dept: ""}
];

const metadata = ["Project Name", "Location", "Date", "Status", "Department"];

function EditMD(md, label, i, searchEditQuery, setSearchEditQuery, editOpen, setEditOpen) {
  searchEditQuery = md;

  return (
    <tr style={{height: '50px'}}>
      <td style={{ fontSize: '12px', width: '25%', textAlign: 'left', borderBottom:'1px solid black'}} >{label + ": "}</td>
      <td style={{ fontSize: '12px', width: '50%', textAlign: 'left', borderBottom:'1px solid black'}} >
        { editOpen === i?
          <Input
            size="small"
            defaultValue={md === '' ? "Enter a " + label : searchEditQuery}
            onChange={(e) => setSearchEditQuery(e.target.value)}
            style={{ width: '90%'}}
          />
          :md}
        </td>
      <td style={{ fontSize: '12px', width: '10%', textAlign: 'right', borderBottom:'1px solid black'}} >
        {md === '' ? 
          <Button type="primary" size={"small"} onClick={() => {setEditOpen(editOpen === null ? i : null)}}>Create</Button>
          : <Button color="default" variant="text" size={"default"} icon={<EditOutlined />}
            onClick={() => {setEditOpen(editOpen === null ? i : null)}}/>}
      </td>
    </tr>
  );
}

function popupForm(proj, searchEditQuery, setSearchEditQuery, editOpen, setEditOpen) {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  proj[2] = dayjs(proj[2]).format('MMM DD, YYYY');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'left',
        width: '80%',
        height: '85%',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        margin: '20px auto',
        marginLeft: '0',
        padding: '20px',
        paddingTop: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'auto'
      }}
    >

    <div style={{overflowY: 'auto', width: '100%', height: '100%'}}>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <tr style={{paddingTop: '0'}}>
              <th colspan="3" style={{height: '40px', textAlign: 'center', padding: '0px'}} ><h3 style={{ margin:'0'}}>Current Metadata</h3></th>
          </tr>
          <tr style={{paddingTop: '0'}}>
              <th colspan="3" style={{height: '40px', textAlign: 'center', borderBottom:'1px solid black', padding: '0px'}} ><h5 style={{ margin:'0'}}>
                {proj[0] + " Project"}
                
                </h5></th>
          </tr>
          {metadata.map((label, index) => (
            EditMD(proj[index], label, index, searchEditQuery, setSearchEditQuery, editOpen, setEditOpen)
          ))}
      </table>
    </div>
  </Box>
  );
}

export default function AdminMetadataManage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopupFormOpen, setPopupFormOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [searchEditQuery, setSearchEditQuery] = useState('');
  const [editOpen, setEditOpen] = useState(null);

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
        <Title level={1}>Metadata Management</Title>
      </Box>
       
<Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
    height: '100vh',
    width: '80%',
    margin: '20px auto',
    marginTop: '0',
    borderRadius: '10px',
    padding: '20px',
    overflow: 'auto',
  }}
>

  {/* left container with current metadata */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'left',
      width: '50%',
      margin: '20px auto',
      marginRight: '0',
      borderRadius: '10px',
    }}
  >
    <Input
      placeholder="Search for a project.."
      prefix={<SearchOutlined />}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ width: '300px' }}
    />

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'left',
        width: '80%',
        height: '100%',
        margin: '20px auto',
        marginLeft: '0',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'auto',
      }}
    >

    <div style={{overflowY: 'auto', width: '100%', height: '100%'}}>
    <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <tr>
            <th colspan="2" style={{height: '40px', textAlign: 'center', borderBottom:'1px solid black', padding: '0px'}} ><h3>Projects</h3></th>
        </tr>
        {(projects.filter(p => {return p.name.toLowerCase().includes(searchQuery.toLowerCase())})).map((project) => (
          <tr onClick={() => {setPopupFormOpen(isPopupFormOpen ? false : true);
            setProjectName(project)
          }} style={{height: '50px'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#fcfcfc';}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '';}}>
            <td style={{ fontSize: '12px', textAlign: 'left', borderBottom:'1px solid black'}} >{project.name}</td>
          </tr>
        ))}
    </table>
    </div>

  </Box>
  </Box>

  {/* right container to add metadata*/}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-Center',
      alignItems: 'center',
      width: '50%',
      margin: '20px auto',
      borderRadius: '10px',
      padding: '10px',
      overflow: 'auto',
    }}
  >

    {/* <Box
      onClick={() => 
        {setPopupFormOpen(isPopupFormOpen ? false : true)}
      }
      sx={{
        textAlign: 'center',
        width: 200,
        height: 80,
        border: 1,
        borderRadius: '16px',
        '&:hover': { boxShadow: 3},
        }}
      >
        {isPopupFormOpen ? 
        <CloseOutlined style={{ marginTop: '10px', fontSize: '30px'}}/>
        : <PlusOutlined style={{ marginTop: '10px', fontSize: '30px'}}/>}
        {isPopupFormOpen ? 
        <h5 style={{margin: '15px'}}>Close</h5>
        : <h5 style={{margin: '15px'}}>Add Metadata</h5>}
    </Box>*/}
    

    {isPopupFormOpen && popupForm(Object.values(projectName), searchEditQuery, setSearchEditQuery, editOpen, setEditOpen)}
  </Box>

</Box>

    </Box>
  );
}