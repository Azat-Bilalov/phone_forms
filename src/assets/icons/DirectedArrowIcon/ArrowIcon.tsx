import * as React from 'react';
const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <g transform="matrix(6.123233995736766e-17,1,1,-6.123233995736766e-17,0,0)">
            <path
                d="M6.175 6.53333L10 10.35L13.825 6.53333L15 7.70833L10 12.7083L5 7.70833L6.175 6.53333Z"
                fill="currentColor"
            />
        </g>
    </svg>
);
export default SVGComponent;
