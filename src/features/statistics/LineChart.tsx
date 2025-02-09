import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleLinear, scaleTime } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { Employee } from '../employees/types';

interface ChartData {
  year: Date;
  hires: number;
}

interface ResponsiveLineChartProps {
  width: number;
  height: number;
  employees: Employee[];
}

const ResponsiveLineChart = ({
  width,
  height,
  employees,
}: ResponsiveLineChartProps) => {
  const theme = useTheme();
  const axisColor = theme.palette.text.primary;

  const margin = { top: 20, right: 30, bottom: 50, left: 40 };

  const hiresByYear = employees.reduce<Record<number, number>>((acc, emp) => {
    const year = new Date(emp.hireDate).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const data: ChartData[] = Object.keys(hiresByYear).map((year) => ({
    year: new Date(parseInt(year), 0, 1),
    hires: hiresByYear[parseInt(year)],
  }));

  if (data.length === 0) {
    return null;
  }

  const xScale = scaleTime({
    domain: [
      new Date(Math.min(...data.map((d) => d.year.getTime()))),
      new Date(Math.max(...data.map((d) => d.year.getTime()))),
    ],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.hires))],
    range: [height - margin.bottom, margin.top],
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
            fill: axisColor,
            fontSize: 11,
            textAnchor: 'end',
            dy: '0.33em',
          })}
          label="Number of Hires"
          labelProps={{
            fill: axisColor,
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
            fill: axisColor,
            fontSize: 11,
            textAnchor: 'middle',
          })}
          label="Year"
          labelProps={{
            fill: axisColor,
            fontSize: 12,
            textAnchor: 'middle',
          }}
        />

        <LinePath
          data={data}
          x={(d) => xScale(d.year)}
          y={(d) => yScale(d.hires)}
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  );
};

interface LineChartProps {
  employees: Employee[];
}

export const LineChart = ({ employees }: LineChartProps) => {
  return (
    <Box width="100%" height="300px">
      <ParentSize>
        {({ width, height }) => (
          <ResponsiveLineChart
            width={width}
            height={height}
            employees={employees}
          />
        )}
      </ParentSize>
    </Box>
  );
};
