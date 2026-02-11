// Minimal ambient declarations to silence missing type errors during development.
// For production-quality types, install proper @types packages and remove these.

declare module 'next/link';
declare module 'next/navigation';
declare module 'react-hot-toast';
declare module 'react-icons/*';
declare module 'react-icons/md';
declare module 'react-icons/fa';
declare module 'clsx';
declare module '*.css';
declare module '*.png';
declare module '*.jpg';

// Rely on official `@types/react` for `react` and `react/jsx-runtime` types.

declare module 'react-icons/md' {
  export const MdDownload: any;
  export const MdFavorite: any;
  export const MdDelete: any;
  export const MdFacebook: any;
  export const MdTwitter: any;
  export const MdLinkedIn: any;
  export const MdLinkedin: any;
}

declare module 'react-icons/fa' {
  export const FaTwitter: any;
  export const FaLinkedin: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element {}
  interface ElementClass {}
  interface ElementAttributesProperty { props: any }
}
