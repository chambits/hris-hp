import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { employees } from '../../../data';
import { Box, useTheme } from '@mui/material';

const departmentCounts = employees.reduce<Record<string, number>>(
  (acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  },
  {}
);

const data = Object.keys(departmentCounts).map((key) => ({
  department: key,
  count: departmentCounts[key],
}));

const width = 500;
const height = 300;
const margin = { top: 20, right: 30, bottom: 120, left: 40 };

const xScale = scaleBand({
  domain: data.map((d) => d.department),
  range: [margin.left, width - margin.right],
  padding: 0.2,
});

const yScale = scaleLinear({
  domain: [0, Math.max(...data.map((d) => d.count))],
  range: [height - margin.bottom, margin.top],
});

export const BarChart = () => {
  const theme = useTheme();
  const axisColor = theme.palette.text.primary;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <svg width={width} height={height}>
        <Group>
          <AxisLeft
            scale={yScale}
            left={margin.left}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={() => ({
              fill: axisColor,
              fontSize: 12,
              textAnchor: 'end',
            })}
          />

          <AxisBottom
            scale={xScale}
            top={height - margin.bottom}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={() => ({
              angle: -45,
              textAnchor: 'end',
              fontSize: 12,
              fill: axisColor,
            })}
          />

          {data.map((d) => (
            <Bar
              key={d.department}
              x={xScale(d.department)}
              y={yScale(d.count)}
              width={xScale.bandwidth()}
              height={height - margin.bottom - yScale(d.count)}
              fill={theme.palette.primary.main}
            />
          ))}
        </Group>
      </svg>
    </Box>
  );
};
