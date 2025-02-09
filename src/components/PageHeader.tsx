import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

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
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
        {breadcrumbs.map((breadcrumb, index) =>
          breadcrumb.href ? (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={breadcrumb.href}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {index === 0 && <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
              {breadcrumb.label}
            </Link>
          ) : (
            <Typography key={index} color="text.primary">
              {breadcrumb.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
      <Typography variant="h4" component="h1" gutterBottom color="text.primary">
        {title}
      </Typography>
    </>
  );
};
