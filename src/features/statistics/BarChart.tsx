import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { employees } from '../../../data';

// Sample Employee Dataset
// const employees = [
//   { department: 'Engineering' },
//   { department: 'Marketing' },
//   { department: 'Engineering' },
//   { department: 'Sales' },
//   { department: 'Engineering' },
//   { department: 'Marketing' },
//   { department: 'Sales' },
//   { department: 'Product' },
//   { department: 'Product' },
//   { department: 'Engineering' },
// ];

// Compute department counts
const departmentCounts = employees.reduce((acc, emp) => {
  acc[emp.department] = (acc[emp.department] || 0) + 1;
  return acc;
}, {});

const data = Object.keys(departmentCounts).map((key) => ({
  department: key,
  count: departmentCounts[key],
}));

// Chart dimensions
const width = 500;
const height = 300;
const margin = { top: 20, right: 30, bottom: 50, left: 40 };

// Scales
const xScale = scaleBand({
  domain: data.map((d) => d.department),
  range: [margin.left, width - margin.right],
  padding: 0.2,
});

const yScale = scaleLinear({
  domain: [0, Math.max(...data.map((d) => d.count))],
  range: [height - margin.bottom, margin.top],
});

const BarChart = () => {
  return (
    <svg width={width} height={height}>
      <Group>
        {/* Y-Axis */}
        <AxisLeft scale={yScale} left={margin.left} />

        {/* X-Axis */}
        <AxisBottom scale={xScale} top={height - margin.bottom} />

        {/* Bars */}
        {data.map((d) => (
          <Bar
            key={d.department}
            x={xScale(d.department)}
            y={yScale(d.count)}
            width={xScale.bandwidth()}
            height={height - margin.bottom - yScale(d.count)}
            fill="purple"
          />
        ))}
      </Group>
    </svg>
  );
};

export default BarChart;
