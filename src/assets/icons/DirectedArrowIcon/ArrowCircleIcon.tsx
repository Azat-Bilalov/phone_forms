import * as React from 'react';
const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        fill="#000000"
        width="800px"
        height="800px"
        viewBox="0 0 256 256"
        id="Flat"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M128,28A100,100,0,1,0,228,128,100.11332,100.11332,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.10416,92.10416,0,0,1,128,220Zm42.82812-94.82813a3.99854,3.99854,0,0,1,0,5.65625l-33.94091,33.94141a3.99992,3.99992,0,0,1-5.65674-5.65674L158.34326,132H88a4,4,0,0,1,0-8h70.34326L131.23047,96.88721a3.99992,3.99992,0,0,1,5.65674-5.65674Z" />
    </svg>
);
export default SVGComponent;
