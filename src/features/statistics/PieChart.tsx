import { Box } from '@mui/material';
import { Group } from '@visx/group';
import { LegendOrdinal } from '@visx/legend';
import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';
import { Pie } from '@visx/shape';
import { Employee } from '../employees/types';

interface ResponsivePieProps {
  width: number;
  height: number;
  employees: Employee[];
}

interface PieChartProps {
  employees: Employee[];
}

const ResponsivePie = ({ width, height, employees }: ResponsivePieProps) => {
  const statusCounts = employees.reduce<Record<string, number>>((acc, emp) => {
    acc[emp.status] = (acc[emp.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCounts).map((key) => ({
    status: key,
    count: statusCounts[key],
  }));

  const radius = Math.min(width, height) / 2;

  const colorScale = scaleOrdinal({
    domain: data.map((d) => d.status),
    range: ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0'],
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={data}
            pieValue={(d) => d.count}
            outerRadius={radius * 0.8}
            innerRadius={radius * 0.4}
            cornerRadius={5}
            padAngle={0.02}
          >
            {(pie) =>
              pie.arcs.map((arc, i) => (
                <g key={i}>
                  <path
                    d={pie.path(arc) || ''}
                    fill={colorScale(arc.data.status || '')}
                  />
                </g>
              ))
            }
          </Pie>
        </Group>
      </svg>

      <LegendOrdinal
        scale={colorScale}
        direction="row"
        shape="circle"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1px',
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
