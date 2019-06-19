import { Box, Button, Container, makeStyles } from "@material-ui/core";
import React, { forwardRef, useCallback } from "react";
import { Switch } from "react-router";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import logo from "./assets/smoothit.png";
import NewSmoothieView from "./NewSmoothieView";
import { fetchFromCatalogApi, useRefreshablePromise } from "./shared";
import SmoothieDetailView from "./SmoothieDetailView";
import SmoothiesProvider from "./SmoothiesProvider";

const App = () => {
  const getSmoothiesContent = useCallback(() => getSmoothies().then(response => response.content), []);
  const [smoothies, refreshSmoothies] = useRefreshablePromise(getSmoothiesContent, []);

  return (
    <BrowserRouter>
      <SmoothiesProvider refreshSmoothies={refreshSmoothies}>
        <Container>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <img src={logo} alt="SmoothIT" />
            <SmoothiesList smoothies={smoothies} />
          </Box>

          <Switch>
            <Route {...smoothieDetailRouteProps} component={SmoothieDetailRoute} />
            <NewSmoothieView />
          </Switch>
        </Container>
      </SmoothiesProvider>
    </BrowserRouter>
  );
};

const smoothieDetailRouteProps = { path: "/smoothies/:smoothieId" };

const getSmoothies = () => fetchFromCatalogApi("/smoothies");

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 0,
    margin: 0,
    "& li": {
      marginRight: "1rem"
    }
  }
});

const SmoothiesList = ({ smoothies }) => {
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      {smoothies.map(smoothie => (
        <SmoothieListItem key={smoothie.id} smoothie={smoothie} />
      ))}
      <NewSmoothieListItem />
    </ul>
  );
};

const SmoothieListItem = ({ smoothie }) => (
  <li>
    <Button color="secondary" component={Link} to={`/smoothies/${smoothie.id}`}>
      {smoothie.name}
    </Button>
  </li>
);

const NewSmoothieListItem = () => (
  <li>
    <Button color="primary" variant="contained" component={Link} to="/">
      Create a smoothie
    </Button>
  </li>
);

const Link = forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

const SmoothieDetailRoute = props => {
  const id = Number(props.match.params.smoothieId);

  return <SmoothieDetailView key={id} {...props} smoothieId={id} />;
};

export default App;
