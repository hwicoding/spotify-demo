import { Typography } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";

const NewReleases = () => {
  const { data, isLoading, error } = useGetNewReleases();
  console.log("ddd", data);
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Releases Albums
      </Typography>
    </div>
  );
};
export default NewReleases;