import React from 'react';

const SvgrMock = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => <svg ref={ref} {...props} data-testid="svg-icon" />
);
export default SvgrMock;