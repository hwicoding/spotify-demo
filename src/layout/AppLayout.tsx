import { Box, styled, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, Outlet } from "react-router";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import Navbar from "./components/Navbar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
});

const SideBar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: "0",
  margin: "0",
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}))


const AppLayout = () => {
  return (
    <Layout>
      <SideBar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>Home</Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>
        <ContentBox sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <LibraryHead />
          <Library />
        </ContentBox>
      </SideBar>
      <ContentBox sx={{ flex: 1, display: "flex", flexDirection: "column", ml: 1 }}>
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  );
};
export default AppLayout;