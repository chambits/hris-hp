import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { Group } from '@visx/group';
import { scaleLinear, scaleTime } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { employees } from '../../../data';
import { useTheme } from '@mui/material';

const hiresByYear = employees.reduce<Record<number, number>>((acc, emp) => {
  const year = new Date(emp.hireDate).getFullYear();
  acc[year] = (acc[year] || 0) + 1;
  return acc;
}, {});

const data = Object.keys(hiresByYear).map((year) => ({
  year: new Date(parseInt(year), 0, 1),
  hires: hiresByYear[parseInt(year)],
}));

const width = 500;
const height = 300;
const margin = { top: 20, right: 30, bottom: 50, left: 40 };

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

export const LineChart = () => {
  const theme = useTheme();
  const axisColor = theme.palette.text.primary;

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
