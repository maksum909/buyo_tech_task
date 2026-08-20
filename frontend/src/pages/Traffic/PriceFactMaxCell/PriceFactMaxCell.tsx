import { Box, Typography } from "@mui/material";

const getBarColor = (fact: number, max: number) => {
  if (max <= 0) {
    return fact > 0 ? "#e53935" : "#c8e6c9";
  }

  const ratio = (fact / max) * 100;

  if (ratio <= 79.99) return "#43a047";
  if (ratio <= 99.99) return "#f9a825";
  return "#e53935";
};

const formatPrice = (value: number) => `${(value ?? 0).toFixed(2)}$`;

const PriceFactMaxCell = ({
  fact = 0,
  max = 0,
}: {
  fact?: number;
  max?: number;
}) => {
  const fillPercent =
    max > 0 ? Math.min((fact / max) * 100, 100) : fact > 0 ? 100 : 0;
  const barColor = getBarColor(fact, max);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={0.75}
      sx={{ minWidth: 160, whiteSpace: "nowrap" }}
    >
      <Typography variant="body2" component="span" sx={{ fontSize: "0.875rem" }}>
        {formatPrice(fact)}
      </Typography>

      <Box
        sx={{
          flex: 1,
          height: 10,
          minWidth: 56,
          maxWidth: 80,
          borderRadius: 1,
          backgroundColor: "#e0e0e0",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${fillPercent}%`,
            height: "100%",
            backgroundColor: barColor,
          }}
        />
      </Box>

      <Typography variant="body2" component="span" sx={{ fontSize: "0.875rem" }}>
        {formatPrice(max)}
      </Typography>
    </Box>
  );
};

export default PriceFactMaxCell;
