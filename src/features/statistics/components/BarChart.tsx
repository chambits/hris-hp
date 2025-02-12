import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import React, { useMemo } from 'react';
import { Employee } from '../../employees/types';
import { useStats } from '../hooks/useStats';

interface BaseChartProps {
  employees: Employee[];
}

const BaseChart: React.FC<
  BaseChartProps & { width: number; height: number }
> = ({ employees, width, height }) => {
  const theme = useTheme();
  const [tooltipData, setTooltipData] = React.useState<{
    department: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const { employeesCountByDepartment } = useStats();
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

  const xScale = useMemo(
    () =>
      scaleBand({
        domain: employeesCountByDepartment.map((d) => d.department),
        range: [margin.left, width - margin.right],
        padding: 0.2,
      }),
    [employeesCountByDepartment, width, margin]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [
          0,
          Math.max(...employeesCountByDepartment.map((d) => d.count)),
        ],
        range: [height - margin.bottom, margin.top],
      }),
    [employeesCountByDepartment, height, margin]
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
    <Box position="relative">
      <svg width={width} height={height}>
        <Group>
          <AxisLeft
            scale={yScale}
            left={margin.left}
            {...axisProps}
            tickLabelProps={() => ({
              ...axisProps.tickLabelProps(),
              textAnchor: 'end',
              dx: -1,
            })}
            label="Number of Employees"
            labelProps={{
              fill: axisColor,
              fontSize: 12,
              textAnchor: 'middle',
              dx: 4,
            }}
          />

          <AxisBottom
            scale={xScale}
            top={height - margin.bottom}
            {...axisProps}
            tickLabelProps={() => ({
              ...axisProps.tickLabelProps(),
              angle: -45,
              textAnchor: 'end',
              dy: 1,
              fontSize: 12,
            })}
          />

          {employeesCountByDepartment.map((d) => (
            <Bar
              key={d.department}
              x={xScale(d.department) ?? 0}
              y={yScale(d.count)}
              width={xScale.bandwidth()}
              height={height - margin.bottom - yScale(d.count)}
              fill={theme.palette.primary.main}
              rx={4}
              onMouseMove={(event) => {
                const point = localPoint(event);
                if (!point) return;
                setTooltipData({
                  department: d.department,
                  count: d.count,
                  x: point.x + 80,
                  y: point.y + 80,
                });
              }}
              onMouseLeave={() => setTooltipData(null)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                opacity: tooltipData?.department === d.department ? 0.8 : 1,
              }}
            />
          ))}
        </Group>
      </svg>

      {tooltipData && (
        <Box
          sx={{
            position: 'absolute',
            top: tooltipData.y - 60,
            left: tooltipData.x,
            transform: 'translateX(-50%)',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            paddingX: 2,
            paddingY: 1,
            borderRadius: 1,
            boxShadow: theme.shadows[3],
            pointerEvents: 'none',
            zIndex: 1000,
            minWidth: '120px',
          }}
        >
          <Box sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {tooltipData.department}
          </Box>
          <Box sx={{ color: 'text.secondary' }}>
            {tooltipData.count} employees
            <br />
            {((tooltipData.count / employees.length) * 100).toFixed(1)}%
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const BarChart: React.FC<BaseChartProps> = ({ employees }) => {
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
