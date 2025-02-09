import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { employees } from '../../../data';
import { useTheme } from '@mui/material/styles';

const groupedData = employees.reduce<Record<string, number>>((acc, emp) => {
  const key = `${emp.country}-${emp.status}`;
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

const uniqueCountries = [...new Set(employees.map((e) => e.country))];
const uniqueStatuses = [...new Set(employees.map((e) => e.status))];

const heatmapData = uniqueCountries.map((country) => ({
  country,
  values: uniqueStatuses.map((status) => ({
    status,
    count: groupedData[`${country}-${status}`] || 0,
  })),
}));

const width = 500;
const height = 300;
const margin = { top: 30, right: 30, bottom: 50, left: 100 };

const xScale = scaleBand({
  domain: uniqueStatuses,
  range: [margin.left, width - margin.right],
  padding: 0.2,
});

const yScale = scaleBand({
  domain: uniqueCountries,
  range: [margin.top, height - margin.bottom],
  padding: 0.2,
});

const colorScale = scaleLinear({
  domain: [
    0,
    Math.max(...heatmapData.flatMap((d) => d.values.map((v) => v.count))),
  ],
  range: ['#e0f7fa', '#00796b'],
});

export const HeatmapChart = () => {
  const theme = useTheme();

  const axisColor = theme.palette.text.primary;
  const textColor = theme.palette.text.secondary;

  return (
    <svg width={width} height={height}>
      <Group>
        <AxisLeft
          scale={yScale}
          left={margin.left}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => ({
            fill: textColor,
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
            fill: textColor,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />

        {heatmapData.map((row) =>
          row.values.map((cell) => (
            <rect
              key={`${row.country}-${cell.status}`}
              x={xScale(cell.status)}
              y={yScale(row.country)}
              width={xScale.bandwidth()}
              height={yScale.bandwidth()}
              fill={colorScale(cell.count)}
              stroke="#ffffff"
            />
          ))
        )}
      </Group>
    </svg>
  );
};
