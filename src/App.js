
import { Box, Container} from '@mui/material';
import { EmployeesDetails } from './EmployeesDeatils';

function App() {


  return (
    <Container maxWidth="xl">
      <Box mt={12}>
        <EmployeesDetails />
      </Box>
    </Container>
  );
}

export default App;
