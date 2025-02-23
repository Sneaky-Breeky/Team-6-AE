import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Switch, Input } from 'antd';
import { SearchOutlined} from '@ant-design/icons';

const { Title } = Typography;

const projects = ["School Construction", "Bridge Construction", "High-rise Development", "Highway Expansion", "Oil Pipeline Repair", "Park Restoration"];

const metadata = ["Project Name", "Location", "Date", "Image Description", "Tags"];

function popupForm(projName) {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

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
        padding: '20px',
        paddingTop: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'auto'
      }}
    >

    <div style={{overflowY: 'auto', width: '100%', height: '100%'}}>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <tr style={{paddingTop: '0'}}>
              <th colspan="2" style={{height: '40px', textAlign: 'center', padding: '0px'}} ><h3 style={{ margin:'0'}}>Current Metadata</h3></th>
          </tr>
          <tr style={{paddingTop: '0'}}>
              <th colspan="2" style={{height: '40px', textAlign: 'center', borderBottom:'1px solid black', padding: '0px'}} ><h5 style={{ margin:'0'}}>{projName}</h5></th>
          </tr>
          {metadata.map((md) => (
            <tr style={{height: '50px'}}>
              <td style={{ fontSize: '12px', textAlign: 'left', borderBottom:'1px solid black'}} >{md}</td>
              <td style={{ fontSize: '12px', textAlign: 'right', borderBottom:'1px solid black'}} >
              <Switch onChange={onChange} />
              </td>
            </tr>
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
        width: '100%',
        height: '100%',
        margin: '20px auto',
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
        {(projects.filter(p => {return p.toLowerCase().includes(searchQuery.toLowerCase())})).map((project) => (
          <tr onClick={() => {setPopupFormOpen(isPopupFormOpen ? false : true);
            setProjectName(project)
          }} style={{height: '50px'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#fcfcfc';}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '';}}>
            <td style={{ fontSize: '12px', textAlign: 'left', borderBottom:'1px solid black'}} >{project}</td>
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
      width: '40%',
      height: '90%',
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
    

    {isPopupFormOpen && popupForm(projectName)}
  </Box>

</Box>

    </Box>
  );
}