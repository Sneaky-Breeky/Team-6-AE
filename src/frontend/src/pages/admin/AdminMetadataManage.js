import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Popover, Radio, Form, Input, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, CloseOutlined} from '@ant-design/icons';

const { Title } = Typography;

const metadata = ["Project Name", "Location", "Date", "Image Description", "Tags"];

function popupForm() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'left',
        width: '80%',
        height: '45%',
        margin: '20px auto',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '20px',
        paddingTop: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'auto'
      }}
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        size='small'
        autoComplete="off"
      >

      <Form.Item
        label={<p style={{fontSize:'12px', margin: '0px'}}>Metadata Name</p>}
        name="name"
        rules={[
          {
            required: true,
            message:<p style={{fontSize:'12px', margin: '0px'}}>Please select the metadat's name!</p>,
          },
        ]}
        style={{ padding: "0px", marginBottom: "5px", marginTop: "0px"  }}
      >
        <Input/>
      </Form.Item>

      <Form.Item 
        label={<p style={{fontSize:'12px', margin: '0px'}}>Active Status</p>}
        name="status"
        rules={[
          {
            required: true,
            message:<p style={{fontSize:'12px', margin: '0px'}}>Please select a status!</p>,
          },
        ]}
        style={{ marginBottom: "10px" }}
      >
        <Radio.Group style={{ marginTop: "0px" }}>
          <Radio value="active"> <p style={{fontSize:'12px', margin: '0px'}}>Active</p> </Radio>
          <Radio value="inactive"> <p style={{fontSize:'12px', margin: '0px'}}>Inactive</p> </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item 
        label={null}
        style={{ marginBottom: "5px" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item >
    </Form>
  </Box>
  );
}

export default function AdminMetadataManage() {
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
    borderRadius: '10px',
    padding: '20px',
    overflow: 'auto',
  }}
>

  {/* left container with current metadata */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'left',
      width: '50%',
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
            <th colspan="2" style={{height: '40px', textAlign: 'center', borderBottom:'1px solid black', padding: '0px'}} ><h3>Current Metadata</h3></th>
        </tr>
        {metadata.map((md) => (
          <tr style={{height: '50px'}}>
            <td style={{ fontSize: '12px', textAlign: 'left', borderBottom:'1px solid black'}} >{md}</td>
            <td style={{ fontSize: '12px', width: '5%', textAlign: 'left', borderBottom:'1px solid black'}} >{
              // reload if status input differs from original user.status
              <Popover
              content={
                <><Checkbox value="A">Delete</Checkbox>
                <br />
                <Checkbox value="B">Deactivate</Checkbox></>}
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

  {/* right container to add metadata*/}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-Center',
      alignItems: 'center',
      width: '40%',
      borderRadius: '10px',
      padding: '20px',
      overflow: 'auto',
    }}
  >

    <Box
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
    </Box>

    {isPopupFormOpen && popupForm()}
  </Box>

</Box>

    </Box>
  );
}