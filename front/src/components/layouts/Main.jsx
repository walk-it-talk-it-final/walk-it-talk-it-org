import Grid from "@mui/material/Grid";

const Main = ({ children }) => {
  return (
    <Grid container my={0} spacing={1} direction="column" alignItems="center">
      {children}
    </Grid>
  );
};

export default Main;
