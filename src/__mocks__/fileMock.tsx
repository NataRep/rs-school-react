import React from 'react';

const mockAsset = {
  src: '/mocked-path-to-asset.svg',
  height: 24,
  width: 24,
  blurDataURL: '',
};

const FileMockComponent = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => <svg ref={ref} {...props} data-testid="svg-icon" />);

Object.assign(FileMockComponent, mockAsset);

export default FileMockComponent;
