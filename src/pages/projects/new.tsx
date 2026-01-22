import { Typography, Box } from '@mui/material';
import { useTranslate } from 'react-admin';

const NewProjectsPage = () => {
  const translate = useTranslate();
  
  return (
    <Box p={2}>
      <Typography variant="h4">
        {translate('resources.projects.new')}
      </Typography>
      {/* Project creation form will go here */}
      List proiecte noi
    </Box>
  );
};

export default NewProjectsPage;
