import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Input, Form } from 'antd';
import { SearchOutlined, CloseOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import { projects } from '../../utils/dummyData.js';

const { Title } = Typography;

export default function AdminMetadataManage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopupFormOpen, setPopupFormOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [project, setProject] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
  };

  const [form] = Form.useForm();

  const handleMDEdits = (values) => {
    console.log("input values: ", values);
    console.log("null name: ", !values.name ); // if name is empty, returns true
    form.resetFields();
  };

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
            setEditOpen(false);
            setProject(p);
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

    {/*isPopupFormOpen && popupForm(form, onFinish, project, searchEditQuery, setSearchEditQuery, setPopupFormOpen,
      editNameOpen, setEditNameOpen, editLocOpen, setEditLocOpen, editDateOpen, setEditDateOpen, editStateOpen, setEditStateOpen, editPhaseOpen, setEditPhaseOpen
    )*/}

    {isPopupFormOpen && 
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
                  {project.name + " Project"}
                  
                  </h5></th>
            </tr>
            
        </table>

        <Form
          form={form}
          name="md_edits"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          autoComplete="off"
          onFinish={handleMDEdits}
          style={{margin: '20px auto'}}
          onKeyDown={(e) => {
              if (e.key === "Enter") {
                  e.preventDefault();
              }
          }}>

        <Form.Item
          name="name"
          label="Project Name"
        >
          {isEditOpen ? <Input defaultValue={project.name}/> : project.name}
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
        >
          {isEditOpen ? <Input defaultValue={project.location}/> : project.location}
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
        >
          {isEditOpen ? <Input defaultValue={dayjs(project.date).format('MMM DD, YYYY')}/> : dayjs(project.date).format('MMM DD, YYYY')}
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
        >
          {isEditOpen ? <Input defaultValue={project.status}/> : project.status}
        </Form.Item>

        <Form.Item
          name="phase"
          label="Phase"
        >
          {isEditOpen ? <Input defaultValue={project.phase}/> : project.phase}
        </Form.Item>
        

        {Object.entries(project.fields).map(([key, value]) => {
          console.log(key, value); 
          return (<Form.Item
            name={key} 
            label={key}
          >
            {isEditOpen ? <Input defaultValue={value}/> : value}
          </Form.Item>);
        })}

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px auto', marginBottom: '0'}}>
          <Button color="default" variant="text" size={"default"} icon={<CloseOutlined/>}
            onClick={(e) => {
              //e.stopPropagation();
              form.resetFields();
              setPopupFormOpen(false);
            }}/>

          <Button type="default" htmlType="button" size={"default"}
            onClick={() => {
              //e.stopPropagation();
              form.resetFields();
              setEditOpen(isEditOpen ? false:true);
            }}>{isEditOpen ? 'Close':'Edit'}</Button>


          {isEditOpen ?
          (<Button htmlType="submit" type="primary" size={"default"}
            onClick={() => {
              //e.stopPropagation();
              setEditOpen(false);
              //handleMDEdits();
              form.submit();
              setPopupFormOpen(false);
            }}>Submit</Button>)
          : (<Button type="primary" disabled size={"default"}>Submit</Button>)
          }
            
        </div>

        </Form>
        
      </div>
    </Box>
    }

    
  </Box>
  </Box>
    </Box>
  );
}