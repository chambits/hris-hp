import { Search } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';

import { Grid } from '@mui/material';

const EmployeeActions = ({
  onSearch,
  onAddEmployee,
}: {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddEmployee: () => void;
}) => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="space-between"
  >
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search employees"
        onChange={onSearch}
        InputProps={{
          startAdornment: <Search />,
        }}
      />
    </Grid>
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      container
      justifyContent="flex-end"
      spacing={2}
    >
      <Grid item>
        <Button color="primary" variant="contained" onClick={onAddEmployee}>
          Add Employee
        </Button>
      </Grid>
    </Grid>
  </Grid>
);

export default EmployeeActions;
