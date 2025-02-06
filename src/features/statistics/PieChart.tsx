import { Group } from '@visx/group';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { Pie } from '@visx/shape';
import { employees } from '../../../data';

// Compute status counts
const statusCounts = employees.reduce((acc, emp) => {
  acc[emp.status] = (acc[emp.status] || 0) + 1;
  return acc;
}, {});

const data = Object.keys(statusCounts).map((key) => ({
  status: key,
  count: statusCounts[key],
}));

// Chart dimensions
const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2;

// Color scale
const colorScale = scaleOrdinal({
  domain: data.map((d) => d.status),
  range: ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0'],
});

const PieChart = () => {
  return (
    <div>
      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={data}
            pieValue={(d) => d.count}
            outerRadius={radius}
            innerRadius={radius / 2}
            cornerRadius={5}
            padAngle={0.02}
          >
            {(pie) =>
              pie.arcs.map((arc, i) => (
                <g key={i}>
                  <path d={pie.path(arc)} fill={colorScale(arc.data.status)} />
                </g>
              ))
            }
          </Pie>
        </Group>
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <LegendOrdinal scale={colorScale} direction="row" shape="circle" />
      </div>
    </div>
  );
};

export default PieChart;
