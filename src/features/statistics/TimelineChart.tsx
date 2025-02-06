import React from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { curveMonotoneX } from '@visx/curve';
import { employees } from '../../../data';
// Aggregate hires per year
const hiresPerYear = employees.reduce((acc, emp) => {
  const year = new Date(emp.hireDate).getFullYear();
  acc[year] = (acc[year] || 0) + 1;
  return acc;
}, {});

// Convert to array format
const timelineData = Object.keys(hiresPerYear)
  .map((year) => ({
    year: new Date(`${year}-01-01`),
    hires: hiresPerYear[year],
  }))
  .sort((a, b) => a.year - b.year);

// Chart dimensions
const width = 600;
const height = 400;
const margin = { top: 30, right: 30, bottom: 50, left: 50 };

// Scales
const xScale = scaleTime({
  domain: [timelineData[0].year, timelineData[timelineData.length - 1].year],
  range: [margin.left, width - margin.right],
});

const yScale = scaleLinear({
  domain: [0, Math.max(...timelineData.map((d) => d.hires))],
  range: [height - margin.bottom, margin.top],
});

const TimelineChart = () => {
  return (
    <svg width={width} height={height}>
      <Group>
        {/* Y-Axis (Hire Count) */}
        <AxisLeft scale={yScale} left={margin.left} />

        {/* X-Axis (Years) */}
        <AxisBottom scale={xScale} top={height - margin.bottom} />

        {/* Line Path */}
        <LinePath
          data={timelineData}
          x={(d) => xScale(d.year)}
          y={(d) => yScale(d.hires)}
          stroke="#00796b"
          strokeWidth={3}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  );
};

export default TimelineChart;
