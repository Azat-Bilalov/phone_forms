declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.c.svg' {
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.svg' {
    const content: string;
    export default content;
}
