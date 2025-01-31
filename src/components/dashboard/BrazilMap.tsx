import { memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/brazil-states.json";

type BrazilMapProps = {
  data: { [key: string]: number };
  onStateClick: (state: string) => void;
  selectedRegion?: string;
};

function BrazilMap({ data, onStateClick, selectedRegion }: BrazilMapProps) {
  const colorScale = scaleQuantile()
    .domain(Object.values(data))
    .range(["#2a2a3c", "#3a3a4c", "#4a4a5c", "#5a5a6c"]);

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 750,
        center: [-55, -15],
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const stateData = data[geo.properties.sigla] || 0;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={
                  selectedRegion === geo.properties.regiao
                    ? "#00ff88"
                    : colorScale(stateData)
                }
                stroke="#1a1f3c"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#00ff88", outline: "none" },
                  pressed: { outline: "none" },
                }}
                onClick={() => onStateClick(geo.properties.regiao)}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}

export default memo(BrazilMap);
