import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { Breadcrumb } from './Breadcrumb';

interface BreadcrumbLink {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbLink[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
}) => {
  const theme = useTheme();
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        color="text.primary"
        marginBottom={theme.spacing(5)}
      >
        {title}
      </Typography>
    </>
  );
};
