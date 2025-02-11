import { Box, useTheme } from '@mui/material';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { LegendOrdinal } from '@visx/legend';
import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';
import { Pie } from '@visx/shape';
import { useTooltip } from '@visx/tooltip';
import { Employee } from '../../employees/types';
import { useStats } from '../hooks/useStats';

interface ResponsivePieProps {
  width: number;
  height: number;
  employees: Employee[];
}

interface PieChartProps {
  employees: Employee[];
}

const ResponsivePie = ({ width, height, employees }: ResponsivePieProps) => {
  const theme = useTheme();
  const { employeesCountByStatus } = useStats();
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } =
    useTooltip<{ status: string; count: number }>();

  const radius = Math.min(width, height) / 2;

  const colorScale = scaleOrdinal({
    domain: employeesCountByStatus.map((d) => d.status),
    range: ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0'],
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={employeesCountByStatus}
            pieValue={(d) => d.count}
            outerRadius={radius * 0.8}
            innerRadius={radius * 0.4}
            cornerRadius={5}
            padAngle={0.02}
          >
            {(pie) =>
              pie.arcs.map((arc, i) => (
                <g
                  key={i}
                  onMouseEnter={(event) => {
                    const point = localPoint(event);
                    showTooltip({
                      tooltipData: arc.data,
                      tooltipLeft: point?.x,
                      tooltipTop: point?.y,
                    });
                  }}
                  onMouseLeave={() => hideTooltip()}
                >
                  <path
                    d={pie.path(arc) || ''}
                    fill={colorScale(arc.data.status || '')}
                    style={{ cursor: 'pointer' }}
                  />
                </g>
              ))
            }
          </Pie>
        </Group>
      </svg>

      {tooltipData && (
        <Box
          sx={{
            position: 'absolute',
            top: tooltipTop,
            left: tooltipLeft,
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            padding: theme.spacing(1),
            boxShadow: theme.shadows[2],
            borderRadius: theme.spacing(0.5),
            pointerEvents: 'none',
          }}
        >
          <Box>
            <strong>{tooltipData.status}</strong>
            <div>{tooltipData.count} employees</div>
            <div>
              ({((tooltipData.count / employees.length) * 100).toFixed(1)}%)
            </div>
          </Box>
        </Box>
      )}

      <LegendOrdinal
        scale={colorScale}
        direction="row"
        shape="circle"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
        }}
      />
    </Box>
  );
};

export const PieChart = ({ employees }: PieChartProps) => {
  return (
    <Box width="100%" height="400px">
      <ParentSize>
        {({ width, height }) => (
          <ResponsivePie width={width} height={height} employees={employees} />
        )}
      </ParentSize>
    </Box>
  );
};
