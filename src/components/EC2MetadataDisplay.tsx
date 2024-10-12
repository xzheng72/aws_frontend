import React from 'react';
import { Box, Typography } from '@mui/joy';

interface EC2MetadataProps {
  instanceId: string;
  availabilityZone: string;
  frontEnd?: boolean;
}

const EC2MetadataDisplay: React.FC<EC2MetadataProps> = ({
  instanceId,
  availabilityZone,
  frontEnd,
}) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: '#007AFF',
        borderRadius: '4px',
        padding: '16px',
        backgroundColor: '#007AFF12',
      }}
    >
      <Typography level="h4" sx={{ mb: 1 }} textColor={'black'}>
        {frontEnd
          ? 'This Next.js server is running on:'
          : 'The Backend Data is sourced from:'}
      </Typography>
      <Typography>Instance ID: {instanceId}</Typography>
      <Typography>Availability Zone: {availabilityZone}</Typography>
    </Box>
  );
};

export default EC2MetadataDisplay;
