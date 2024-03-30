import React from "react";
import Categories from "./Categories";
import ProductList from "../pages/ProductList";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <GridRow>
          <GridColumn width={4}>
            <Categories/>
          </GridColumn>
          <GridColumn width={12}>
            <ProductList/>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}
