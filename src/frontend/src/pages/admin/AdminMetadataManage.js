import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Input } from 'antd';
import { SearchOutlined, EditOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import { projects } from '../../utils/dummyData.js';

const { Title } = Typography;

const project = {name: "", location: "", date: dayjs(), status: null, phase: null};

const labels = ["Project Name", "Location", "Date", "Status", "Phase"];

function EditMD(md, label, i, searchEditQuery, setSearchEditQuery, editOpen, setEditOpen) {
  searchEditQuery = md;

  return (
    <tr style={{height: '50px'}}>
      <td style={{ fontSize: '12px', width: '25%', textAlign: 'left', borderBottom:'1px solid black'}} >{label + ": "}</td>
      <td style={{ fontSize: '12px', width: '50%', textAlign: 'left', borderBottom:'1px solid black'}} >
        { editOpen === i?
          <Input
            size="small"
            defaultValue={md === null || md === '' ? "": searchEditQuery}
            onChange={(e) => setSearchEditQuery(e.target.value)}
            style={{ width: '90%'}}
          />
          :md}
        </td>
      <td style={{ fontSize: '12px', width: '10%', textAlign: 'right', borderBottom:'1px solid black'}} >
        {md === null || md === '' ? 
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

  project.name = proj.name;
  project.location = proj.location;
  project.date = dayjs(proj.date).format('MMM DD, YYYY');
  project.status = proj.status;
  project.phase = proj.phase;

  var p = Object.values(project);

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
                {proj.name + " Project"}
                
                </h5></th>
          </tr>
          {labels.map((label, index) => (
            EditMD(p[index], label, index, searchEditQuery, setSearchEditQuery, editOpen, setEditOpen)
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
        {(projects.filter(p => {return p.name.toLowerCase().includes(searchQuery.toLowerCase())})).map((p) => (
          <tr onClick={() => {
            setPopupFormOpen(isPopupFormOpen ? false : true);
            setProjectName(p)
          }} style={{height: '50px'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#fcfcfc';}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '';}}>
            <td style={{ fontSize: '12px', textAlign: 'left', borderBottom:'1px solid black'}} >{p.name}</td>
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
    
    {/*Object.values(projectName) */}
    {isPopupFormOpen && popupForm(projectName, searchEditQuery, setSearchEditQuery, editOpen, setEditOpen)}
  </Box>

</Box>

    </Box>
  );
}