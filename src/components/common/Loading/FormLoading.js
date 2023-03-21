import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";

export default function FormLoading({ fields = 4, height }) {
  return (
    <Grid container spacing={2} className="onboarding-container">
      {[...Array(fields)].map((item, index) => (
        <Grid item xs={12} md={6}>
          {" "}
          <Skeleton key={index} animation="wave" height={height} />
        </Grid>
      ))}
    </Grid>
  );
}
