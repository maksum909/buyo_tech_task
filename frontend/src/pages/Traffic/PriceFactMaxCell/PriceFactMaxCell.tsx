import { Box, Typography } from "@mui/material";

/** Max mark at ~75% so overspend still has room past the tick (as in TZ). */
const MAX_MARK_PERCENT = 75;

const getDotColor = (fact: number, max: number) => {
  if (max <= 0) {
    return fact > 0 ? "#e53935" : "#66bb6a";
  }

  const ratio = (fact / max) * 100;

  if (ratio <= 79.99) return "#43a047";
  if (ratio <= 99.99) return "#f9a825";
  return "#e53935";
};

const getDotPercent = (fact: number, max: number) => {
  if (max <= 0) {
    return fact > 0 ? 92 : 4;
  }

  // Map fact onto the track; max tick is at MAX_MARK_PERCENT.
  // Cap slightly before 100% so the dot doesn't sit on the edge.
  const percent = (fact / max) * MAX_MARK_PERCENT;
  return Math.max(4, Math.min(percent, 96));
};

const formatPrice = (value: number) => `${(value ?? 0).toFixed(2)}$`;

const PriceFactMaxCell = ({
  fact = 0,
  max = 0,
}: {
  fact?: number;
  max?: number;
}) => {
  const color = getDotColor(fact, max);
  const dotPercent = getDotPercent(fact, max);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1.25}
      sx={{ minWidth: 200, py: 0.25 }}
    >
      <Typography
        variant="body2"
        component="span"
        sx={{
          fontSize: "0.8125rem",
          fontVariantNumeric: "tabular-nums",
          minWidth: 52,
          textAlign: "right",
          lineHeight: 1,
        }}
      >
        {formatPrice(fact)}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: 88,
          height: 16,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "2px",
            borderRadius: 1,
            backgroundColor: "#9e9e9e",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: `${MAX_MARK_PERCENT}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "2px",
            height: 12,
            borderRadius: 0.5,
            backgroundColor: "#424242",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: `${dotPercent}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 11,
            height: 11,
            borderRadius: "50%",
            backgroundColor: color,
            border: "1.5px solid #fff",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
          }}
        />
      </Box>

      <Typography
        variant="body2"
        component="span"
        sx={{
          fontSize: "0.8125rem",
          fontVariantNumeric: "tabular-nums",
          minWidth: 52,
          lineHeight: 1,
        }}
      >
        {formatPrice(max)}
      </Typography>
    </Box>
  );
};

export default PriceFactMaxCell;
