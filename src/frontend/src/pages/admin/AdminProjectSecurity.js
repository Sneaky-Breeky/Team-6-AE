import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Popover, Radio, Form, Input, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, CloseOutlined} from '@ant-design/icons';

const { Title } = Typography;

const projects = [
  {name: 'Bridge Construction', accessLevel: 'Admins Only', metadata: ['Project Name', 'Location', 'Date', 'Image Description', 'Tags'], status: 'Active', listUsers: []},
  {name: 'High-Rise Development', accessLevel: 'Everyone', metadata: ['Project Name', 'Location', 'Date', 'Tags'], status: 'Active', listUsers: []},
  {name: 'Highway Expansion', accessLevel: 'Selected Users', metadata: ['Project Name', 'Location', 'Date'], status: 'Inactive', listUsers: ['John Doe', 'Sarah Brown']}
];

const users = [
  {name: 'John Doe', role: 'User', status: 'Active'},
  {name: 'Sarah Brown', role: 'Admin', status: 'Active'},
  {name: 'Michael Johnson', role: 'User', status: 'Inactive'}
];

const metadata = ["Project Name", "Location", "Date", "Image Description", "Tags"];

function PopupAccess(project) {
  const [disabled, setDisabled] = useState(project.accessLevel === 'Admins Only');
  const [indDisabled, setIndDisabled] = useState(project.accessLevel === 'Everyone');
  const toggleAdminChecked = () => {
    setDisabled(!disabled);
  };
  const toggleAllChecked = () => {
    setIndDisabled(!indDisabled);
  };
  const onChange = (e) => {
    // change access level here
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div onClick={(e) => e.stopPropagation()}>
    <table style={{width: '100%', borderCollapse: 'collapse'}}>
      <tr style={{height: '50px'}}>
        <td style={{ fontSize: '12px', textAlign: 'left', borderBottom:'1px solid black'}} >
          <Checkbox defaultChecked={project.accessLevel === 'Admins Only'}
            onChange={toggleAdminChecked}>
              Admin Only
          </Checkbox>
          </td>
      </tr>
      <tr style={{height: '50px'}}>
        <td style={{ fontSize: '12px', textAlign: 'left', borderBottom:'1px solid black'}} >
          <Checkbox defaultChecked={project.accessLevel === 'Everyone' ? true : false} 
          disabled={disabled} 
          onChange={toggleAllChecked}>
            Everyone
        </Checkbox>
          </td>
      </tr>
      {users.map((user) => (
        <tr style={{height: '50px'}}>
          <td style={{ fontSize: '12px', textAlign: 'left', borderBottom:'1px solid black'}} >
            <Checkbox defaultChecked={(project.listUsers).includes(user.name) ? true : false} 
              disabled={disabled || indDisabled}
              onChange={onChange}>
                {user.name}
            </Checkbox>
            </td>
        </tr>
      ))}
    </table>
    </div>
  );
}

function popupForm() {
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'left',
        width: '80%',
        height: '100%',
        margin: '20px auto',
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
        <tr>
            <th colspan="2" style={{height: '40px', textAlign: 'center', borderBottom:'1px solid black', padding: '0px'}} >
              <h4>Edit Project Metadata Viewing</h4></th>
        </tr>
        {metadata.map((md) => (
          <tr style={{height: '50px'}}>
            <td style={{ fontSize: '12px', textAlign: 'left', borderBottom:'1px solid black'}} >{md}</td>
            <td style={{ fontSize: '12px', width: '5%', textAlign: 'left', borderBottom:'1px solid black'}} >{
              // reload if status input differs from original user.status
              <Popover
              content={
                <Radio.Group style={{ display: 'flex', flexDirection: 'column', marginTop: "0px" }}>
                  <Radio value="admin"> <p style={{fontSize:'12px', margin: '0px'}}>Admin Only</p> </Radio>
                  <Radio value="everyone"> <p style={{fontSize:'12px', margin: '0px'}}>Everyone</p> </Radio>
                </Radio.Group>}
                trigger="click"
              >
              <Button color="default" variant="text" size={"default"} icon={<EditOutlined />}/>   
              </Popover>          
              }</td>
          </tr>
        ))}
    </table>
    </div>
  </Box>
  );
}

export default function AdminProjectSecurity() {
  const [isPopupFormOpen, setPopupFormOpen] = useState(false);

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
        <Title level={1}>Project Security</Title>
      </Box>
        

<Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'left',
    height: '100vh',
    width: '80%',
    margin: '20px auto',
    borderRadius: '10px',

    overflow: 'auto',
  }}
>

  {/* left container with users */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'left',
      width: '50%',
      margin: '20px auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'auto',
    }}
  >
    <div style={{overflowY: 'auto', width: '100%', height: '100%'}}>
    <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '10px'}}>
      <tr style={{height: '50px'}}>
          <th style={{ width: '25%', textAlign: 'left', borderBottom:'1px solid black'}} >Project</th>
          <th colSpan="2" style={{ width: '15%', textAlign: 'left', borderBottom:'1px solid black'}} >Access Level</th>
      </tr>
          {projects.map((project) => (
              <tr onClick={() => {setPopupFormOpen(isPopupFormOpen ? false : true)}} style={{height: '50px'}}
               onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#fcfcfc';}}
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '';}}>
                  <td style={{ fontSize: '12px', width: '40%', textAlign: 'left', borderBottom:'1px solid black'}} >{project.name}</td>
                  <td style={{ fontSize: '12px', width: '30%', textAlign: 'left', borderBottom:'1px solid black'}} >{project.accessLevel}</td>
                  <td style={{ fontSize: '12px', width: '5%', textAlign: 'left', borderBottom:'1px solid black'}} >{
                    // reload if status input differs from original user.status
                    <Popover
                      content={PopupAccess(project)}
                      trigger="click"
                    >
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        setPopupFormOpen(false);
                      }} 
                      color="default" variant="text" size={"default"} icon={<EditOutlined />}/>   
                    </Popover>          
                    }</td>
              </tr>
          ))}
  </table>
  </div>
  </Box>

  {/* right container with new users */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '40%',
      padding: '20px',

    }}
  >
    {isPopupFormOpen && popupForm()}

  </Box>
</Box>

    </Box>
  );
}