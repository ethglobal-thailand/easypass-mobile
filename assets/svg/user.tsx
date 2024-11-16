import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const UserSVG = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M1.439 15.406a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4 2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2Z"
    />
    <Path
      stroke={props.color}
      strokeWidth={2.5}
      d="M9.439 7.406a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
);
export default UserSVG;
