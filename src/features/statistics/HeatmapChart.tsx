import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Employee, EmployeeStatus } from '../employees/types';

interface CellData {
  status: string;
  count: number;
}

interface HeatmapRow {
  country: string;
  values: CellData[];
}

interface ResponsiveHeatmapProps {
  width: number;
  height: number;
  employees: Employee[];
}

const ResponsiveHeatmap = ({
  width,
  height,
  employees,
}: ResponsiveHeatmapProps) => {
  const theme = useTheme();
  const axisColor = theme.palette.text.primary;
  const textColor = theme.palette.text.secondary;

  // Calculate margin and dimensions
  const margin = { top: 30, right: 30, bottom: 50, left: 100 };

  // Process data
  const groupedData = employees.reduce<Record<string, number>>((acc, emp) => {
    const key = `${emp.country}-${emp.status}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const uniqueCountries = [...new Set(employees.map((e) => e.country))];
  const uniqueStatuses = [...new Set(employees.map((e) => e.status))];

  const heatmapData: HeatmapRow[] = uniqueCountries.map((country) => ({
    country,
    values: uniqueStatuses.map((status) => ({
      status,
      count: groupedData[`${country}-${status}`] || 0,
    })),
  }));

  // Skip rendering if no data
  if (heatmapData.length === 0) {
    return null;
  }

  // Create scales
  const xScale = scaleBand({
    domain: uniqueStatuses,
    range: [margin.left, width - margin.right],
    padding: 0.2,
  });

  const yScale = scaleBand({
    domain: uniqueCountries,
    range: [margin.top, height - margin.bottom],
    padding: 0.2,
  });

  const colorScale = scaleLinear({
    domain: [
      0,
      Math.max(...heatmapData.flatMap((d) => d.values.map((v) => v.count))),
    ],
    range: ['#e3f2fd', '#0d47a1'],
  });

  return (
    <svg width={width} height={height}>
      <Group>
        <AxisLeft
          scale={yScale}
          left={margin.left}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => ({
            fill: textColor,
            fontSize: 11,
            textAnchor: 'end',
            dy: '0.33em',
          })}
          label="Country"
          labelProps={{
            fill: textColor,
            fontSize: 12,
            textAnchor: 'middle',
          }}
        />

        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => ({
            fill: textColor,
            fontSize: 11,
            textAnchor: 'middle',
          })}
          label="Status"
          labelProps={{
            fill: textColor,
            fontSize: 12,
            textAnchor: 'middle',
          }}
        />

        {heatmapData.map((row) =>
          row.values.map((cell) => (
            <rect
              key={`${row.country}-${cell.status}`}
              x={xScale(cell.status as EmployeeStatus)}
              y={yScale(row.country)}
              width={xScale.bandwidth()}
              height={yScale.bandwidth()}
              fill={colorScale(cell.count)}
              stroke="#ffffff"
              rx={2}
              data-tooltip={`${row.country} - ${cell.status}: ${cell.count}`}
            />
          ))
        )}
      </Group>
    </svg>
  );
};

interface HeatmapChartProps {
  employees: Employee[];
}

export const HeatmapChart = ({ employees }: HeatmapChartProps) => {
  return (
    <Box width="100%" height="300px">
      <ParentSize>
        {({ width, height }) => (
          <ResponsiveHeatmap
            width={width}
            height={height}
            employees={employees}
          />
        )}
      </ParentSize>
    </Box>
  );
};
