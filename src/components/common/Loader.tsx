import { getColor } from "@/utils/getColor";
import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Container sx={{ textAlign: "center", padding: "3rem" }}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={getColor("mainGreen")} />
            <stop offset="100%" stopColor={getColor("orange")} />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </Container>
  );
};

export default Loader;
