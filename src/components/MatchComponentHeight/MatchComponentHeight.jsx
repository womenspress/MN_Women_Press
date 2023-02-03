import React, { useState, useEffect } from 'react';

function MatchingHeightComponent(props) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(props.element.current.offsetHeight);
  }, [props.element]);

  const style = {
    height: height + 'px',
  };

  return (
    <div style={style}>
      {props.children}
    </div>
  );
}


/* In the parent component you will have to use this like so:
    first import useRef from react.
    then declare ref:
      const ref = useRef(null);

    this is the component you want to adjust the height of:
    <MatchingComponentHeight element={ref}>
      <COMPONENT NEEDING HEIGHT ADJUSTMENT />
    </MatchingComponentHeight>

    this component is your reference component, need to add 'ref={ref}'
    <Box ref={ref}>...your box stuff here</Box>
*/

export default MatchingHeightComponent;