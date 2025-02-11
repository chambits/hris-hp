import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleLinear } from '@visx/scale';
import { Circle } from '@visx/shape';
import { Employee } from '../../employees/types';
import { useStats } from '../hooks/useStats';

interface ScatterPlotProps {
  employees: Employee[];
}

interface ResponsiveScatterPlotProps {
  width: number;
  height: number;
  employees: Employee[];
}

const ResponsiveScatterPlot = ({
  width,
  height,
}: ResponsiveScatterPlotProps) => {
  const theme = useTheme();
  const { yearsOfService } = useStats();
  const axisColor = theme.palette.text.primary;

  const margin = { top: 20, right: 30, bottom: 50, left: 50 };

  if (yearsOfService.length === 0) return null;

  const xScale = scaleLinear({
    domain: [20, Math.max(...yearsOfService.map((d) => d.age))],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...yearsOfService.map((d) => d.yearsOfService))],
    range: [height - margin.bottom, margin.top],
  });

  const getColor = (department: string) => {
    const colors = {
      Engineering: theme.palette.primary.main,
      Sales: theme.palette.secondary.main,
      Marketing: theme.palette.error.main,
      HR: theme.palette.warning.main,
      default: theme.palette.info.main,
    };
    return colors[department as keyof typeof colors] || colors.default;
  };

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
          label="Years of Service"
          labelProps={{
            fill: axisColor,
            fontSize: 12,
            textAnchor: 'middle',
            dx: 12,
          }}
        />

        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => ({
            fill: axisColor,
            textAnchor: 'middle',
            dy: '0.33em',
            fontSize: 11,
          })}
          label="Age"
          labelProps={{
            fill: axisColor,
            fontSize: 12,
            textAnchor: 'middle',
          }}
        />

        {yearsOfService.map((d, i) => (
          <Circle
            key={i}
            cx={xScale(d.age)}
            cy={yScale(d.yearsOfService)}
            r={6}
            fill={getColor(d.department)}
            opacity={0.6}
            style={{
              cursor: 'pointer',
            }}
          />
        ))}
      </Group>
    </svg>
  );
};

export const ScatterPlot = ({ employees }: ScatterPlotProps) => {
  return (
    <Box width="100%" height="400px">
      <ParentSize>
        {({ width, height }) => (
          <ResponsiveScatterPlot
            width={width}
            height={height}
            employees={employees}
          />
        )}
      </ParentSize>
    </Box>
  );
};
