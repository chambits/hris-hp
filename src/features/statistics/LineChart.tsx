import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { Group } from '@visx/group';
import { scaleLinear, scaleTime } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { employees } from '../../../data';

// Process data: Group hires by year
const hiresByYear = employees.reduce((acc, emp) => {
  const year = new Date(emp.hireDate).getFullYear();
  acc[year] = (acc[year] || 0) + 1;
  return acc;
}, {});

// Convert to array for visualization
const data = Object.keys(hiresByYear).map((year) => ({
  year: new Date(year, 0, 1),
  hires: hiresByYear[year],
}));

// Chart dimensions
const width = 500;
const height = 300;
const margin = { top: 20, right: 30, bottom: 50, left: 40 };

// Scales
const xScale = scaleTime({
  domain: [
    Math.min(...data.map((d) => d.year)),
    Math.max(...data.map((d) => d.year)),
  ],
  range: [margin.left, width - margin.right],
});

const yScale = scaleLinear({
  domain: [0, Math.max(...data.map((d) => d.hires))],
  range: [height - margin.bottom, margin.top],
});

const LineChart = () => {
  return (
    <svg width={width} height={height}>
      <Group>
        {/* Y-Axis */}
        <AxisLeft scale={yScale} left={margin.left} />

        {/* X-Axis */}
        <AxisBottom scale={xScale} top={height - margin.bottom} />

        {/* Line */}
        <LinePath
          data={data}
          x={(d) => xScale(d.year)}
          y={(d) => yScale(d.hires)}
          stroke="blue"
          strokeWidth={2}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  );
};

export default LineChart;
