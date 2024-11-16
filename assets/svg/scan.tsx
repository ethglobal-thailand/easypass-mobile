import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ScanSVG = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1.5 5.406v-2a2 2 0 0 1 2-2h2m-4 12v2a2 2 0 0 0 2 2h2m8-16h2a2 2 0 0 1 2 2v2m-4 12h2a2 2 0 0 0 2-2v-2m-13-4h10"
    />
  </Svg>
);
export default ScanSVG;
