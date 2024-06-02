import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Animations() {
  return (
    <Box>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
