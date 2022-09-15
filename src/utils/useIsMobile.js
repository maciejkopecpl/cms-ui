import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("lg"), {
    defaultMatches: true,
  });
};
