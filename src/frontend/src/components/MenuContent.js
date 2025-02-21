import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SecurityIcon from '@mui/icons-material/Security';
import { isAdmin } from '../utils/auth';


var userPages = [
  { text: 'Dashboard', url: 'dashboard', icon: <HomeRoundedIcon /> },
  { text: 'Project Directory', url: 'projectDirectory', icon: <BackupTableIcon /> },
  { text: 'Upload Files', url: 'uploadFiles', icon: <CloudUploadIcon /> },
  { text: 'Activity Log', url: 'activityLog', icon: <AssignmentRoundedIcon /> },
];

var adminPages = [
  { text: 'Dashboard', url: 'dashboard', icon: <HomeRoundedIcon /> },
  { text: 'Project Creation', url: 'projectCreation', icon: <CreateNewFolderIcon /> },
  { text: 'User Management', url: 'userManagement', icon: <ManageAccountsIcon /> },
  { text: 'Metadata Management', url: 'metadataManagement', icon: <PostAddIcon /> },
  { text: 'Project Security', url: 'projectSecurity', icon: <SecurityIcon /> },
];


const secondaryListItems = [
  { text: 'Logout', icon: <PeopleRoundedIcon /> }
];

// TODO: put this in utils?
const GetDirectoryPrefix = (isAdmin) => (isAdmin ? '/admin/' : '/user/');


export default function MenuContent() {
  const menuItems = isAdmin() ? adminPages : userPages;
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === parseInt(sessionStorage.getItem('menu'))}
              onClick={() => {
                sessionStorage.setItem('menu', index);
                window.location.href = GetDirectoryPrefix(isAdmin()) + item.url;
              }}
            >
              <ListItemIcon sx={{ color: 'white' }} >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
