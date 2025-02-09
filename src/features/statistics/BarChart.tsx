import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import React, { useMemo } from 'react';

interface Employee {
  department: string;
}

interface ChartProps {
  employees: Employee[];
}

const BaseChart: React.FC<ChartProps & { width: number; height: number }> = ({
  employees,
  width,
  height,
}) => {
  const theme = useTheme();
  const axisColor = theme.palette.text.primary;

  const margin = useMemo(
    () => ({
      top: Math.max(20, height * 0.05),
      right: Math.max(30, width * 0.05),
      bottom: Math.max(120, height * 0.2),
      left: Math.max(40, width * 0.08),
    }),
    [width, height]
  );

  const data = useMemo(() => {
    const departmentCounts = employees.reduce<Record<string, number>>(
      (acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      },
      {}
    );

    return Object.entries(departmentCounts).map(([department, count]) => ({
      department,
      count,
    }));
  }, [employees]);

  const xScale = useMemo(
    () =>
      scaleBand({
        domain: data.map((d) => d.department),
        range: [margin.left, width - margin.right],
        padding: 0.2,
      }),
    [data, width, margin]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [0, Math.max(...data.map((d) => d.count))],
        range: [height - margin.bottom, margin.top],
      }),
    [data, height, margin]
  );

  const axisProps = {
    stroke: axisColor,
    tickStroke: axisColor,
    tickLabelProps: () => ({
      fill: axisColor,
      fontSize: Math.max(12, Math.min(width * 0.02, 16)),
    }),
  };

  return (
    <svg width={width} height={height}>
      <Group>
        <AxisLeft
          scale={yScale}
          left={margin.left}
          {...axisProps}
          tickLabelProps={() => ({
            ...axisProps.tickLabelProps(),
            textAnchor: 'end',
            dx: -4,
          })}
        />

        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          {...axisProps}
          tickLabelProps={() => ({
            ...axisProps.tickLabelProps(),
            angle: -45,
            textAnchor: 'end',
            dy: 8,
          })}
        />

        {data.map((d) => (
          <Bar
            key={d.department}
            x={xScale(d.department) ?? 0}
            y={yScale(d.count)}
            width={xScale.bandwidth()}
            height={height - margin.bottom - yScale(d.count)}
            fill={theme.palette.primary.main}
            rx={4}
          />
        ))}
      </Group>
    </svg>
  );
};

export const BarChart: React.FC<ChartProps> = ({ employees }) => {
  return (
    <Box width="100%" height="400px">
      <ParentSize>
        {({ width, height }) => (
          <BaseChart employees={employees} width={width} height={height} />
        )}
      </ParentSize>
    </Box>
  );
};
