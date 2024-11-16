import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const MapSVG = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="m9.14 7.288-7-3.5v13.236l7 3.5 6-3 7 3.5V7.788l-7-3.5-6 3Zm6 8.118-6 3v-9l6-3v9Z"
    />
  </Svg>
);
export default MapSVG;
