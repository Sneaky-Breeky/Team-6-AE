import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Input } from 'antd';
import { SearchOutlined, EditOutlined, CloseOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import { projects } from '../../utils/dummyData.js';

const { Title } = Typography;

function EditMD(md, i, searchEditQuery, setSearchEditQuery, editOpen, setEditOpen) {
  searchEditQuery = md;

  const handleChange = (e) => {
    setSearchEditQuery(e.target.value);
  };

  return (
      <><td style={{ fontSize: '12px', width: '50%', textAlign: 'left', borderBottom: '1px solid black' }}>
      {editOpen ?
        <Input
          size="small"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                setSearchEditQuery(e.target.value);
            }
        }}
          style={{ width: '90%' }} />
        : searchEditQuery}
    </td><td style={{ fontSize: '12px', width: '15%', textAlign: 'right', borderBottom: '1px solid black' }}>
        {searchEditQuery === null || searchEditQuery === '' ?
          <Button size={"small"} onClick={() => { setEditOpen(editOpen ? false : true); } }>
            {editOpen ? 'Close' :
              'Create'}</Button>
          : <Button color="default" variant="text" size={"default"} icon={editOpen ? <CloseOutlined /> : <EditOutlined />}
            onClick={() => { setEditOpen(editOpen ? false : true); } } />}
      </td></>
  );
}

function popupForm(proj, searchEditQuery, setSearchEditQuery, setPopupFormOpen,
  editNameOpen, setEditNameOpen, editLocOpen, setEditLocOpen, editDateOpen, setEditDateOpen, editStateOpen, setEditStateOpen, editPhaseOpen, setEditPhaseOpen) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'left',
        width: '80%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        margin: '20px auto',
        marginLeft: '0',
        marginTop: '0',
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
          {/*{labels.map((label, index) => (
            EditMD(p[index], label, index, searchEditQuery, setSearchEditQuery, editOpen, setEditOpen)
          ))} */}

          <tr style={{height: '50px'}}>
            <td style={{ fontSize: '12px', width: '25%', textAlign: 'left', borderBottom:'1px solid black'}} >{"Project Name: "}</td>
            {EditMD(proj.name, 0, searchEditQuery, setSearchEditQuery, editNameOpen, setEditNameOpen)}
          </tr>
          <tr style={{height: '50px'}}>
            <td style={{ fontSize: '12px', width: '25%', textAlign: 'left', borderBottom:'1px solid black'}} >{"Location: "}</td>
            {EditMD(proj.location, 1, searchEditQuery, setSearchEditQuery, editLocOpen, setEditLocOpen)}
          </tr>
          <tr style={{height: '50px'}}>
            <td style={{ fontSize: '12px', width: '25%', textAlign: 'left', borderBottom:'1px solid black'}} >{"Date: "}</td>
            {EditMD(dayjs(proj.date).format('MMM DD, YYYY'), 2, searchEditQuery, setSearchEditQuery, editDateOpen, setEditDateOpen)}
          </tr>
          <tr style={{height: '50px'}}>
            <td style={{ fontSize: '12px', width: '25%', textAlign: 'left', borderBottom:'1px solid black'}} >{"Status: "}</td>
            {EditMD(proj.status, 3, searchEditQuery, setSearchEditQuery, editStateOpen, setEditStateOpen)}
          </tr>
          <tr style={{height: '50px'}}>
            <td style={{ fontSize: '12px', width: '25%', textAlign: 'left', borderBottom:'1px solid black'}} >{"Phase: "}</td>
            {EditMD(proj.phase, 4, searchEditQuery, setSearchEditQuery, editPhaseOpen, setEditPhaseOpen)}
          </tr>
          
      </table>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px auto', marginBottom: '0'}}>
        <Button color="default" variant="text" size={"default"} icon={<CloseOutlined/>}
          onClick={(e) => {
            e.stopPropagation();
            setPopupFormOpen(false);
          }}/>
        <Button type="primary" size={"default"}
          onClick={(e) => {
            e.stopPropagation();
            setPopupFormOpen(false);

          }}>Submit</Button>
      </div>
      
    </div>
  </Box>
  );
}

export default function AdminMetadataManage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopupFormOpen, setPopupFormOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [searchEditQuery, setSearchEditQuery] = useState('');
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [editLocOpen, setEditLocOpen] = useState(false);
  const [editDateOpen, setEditDateOpen] = useState(false);
  const [editStateOpen, setEditStateOpen] = useState(false);
  const [editPhaseOpen, setEditPhaseOpen] = useState(false);

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
            setPopupFormOpen(true);
            setEditNameOpen(false);
            setEditLocOpen(false);
            setEditDateOpen(false);
            setEditStateOpen(false);
            setEditPhaseOpen(false);
            setProject(p)
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
      height: '95%',
      margin: '20px auto',
      marginTop: '0',
      borderRadius: '10px',
      padding: '0',
      overflow: 'auto',
    }}
  > 

    {isPopupFormOpen && popupForm(project, searchEditQuery, setSearchEditQuery, setPopupFormOpen,
      editNameOpen, setEditNameOpen, editLocOpen, setEditLocOpen, editDateOpen, setEditDateOpen, editStateOpen, setEditStateOpen, editPhaseOpen, setEditPhaseOpen
    )}
  </Box>
  </Box>
    </Box>
  );
}