import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

interface BreadcrumbLink {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbLink[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
      {breadcrumbs.map((breadcrumb, index) =>
        breadcrumb.href ? (
          <Link
            key={index}
            to={breadcrumb.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
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
  );
};
