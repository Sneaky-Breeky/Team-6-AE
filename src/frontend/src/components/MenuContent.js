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
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { isAdmin } from '../utils/auth';

// assumption that this is only for users and not admin
var mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon /> },
  { text: 'Project Directory', icon: <BackupTableIcon /> },
  { text: 'Upload Files', icon: <CloudUploadIcon /> },
  { text: 'Activity Log', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Logout', icon: <PeopleRoundedIcon /> }
];

// TODO: put this in utils?
function GetDirectoryPrefix(isAdmin) {
  const ret = isAdmin ? '/admin/' : '/user/';
  return ret;
}

if (isAdmin()) {
  mainListItems.push(
    { text: 'Project Creation', icon: <BackupTableIcon /> })
}

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === parseInt(sessionStorage.getItem('menu'))}
              onClick={() => {
                sessionStorage.setItem('menu', index);
                switch (parseInt(sessionStorage.getItem('menu'))) {
                  case 0:
                    window.location.href = GetDirectoryPrefix(isAdmin()) + 'dashboard';
                    break;
                  case 1:
                    window.location.href = GetDirectoryPrefix(isAdmin()) + 'projectDirectory';
                    break;
                  case 2:
                    window.location.href = GetDirectoryPrefix(isAdmin()) + 'uploadFiles';
                    break;
                  case 3:
                    window.location.href = GetDirectoryPrefix(isAdmin()) + 'activityLog';
                    break;
                  case 4:
                    window.location.href = GetDirectoryPrefix(isAdmin()) + 'createProjectDirectory';
                    break;
                  default:
                    window.location.href = GetDirectoryPrefix(isAdmin()) + 'dashboard';
                }
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
