import { SVGProps } from "react";

export function ThreadsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c.3.7.8 1.2 1.4 1.6M12 3a3.6 3.6 0 0 1 3 1.7 3.6 3.6 0 0 1 4.4 4.3 3.6 3.6 0 0 1-1.4 1.6M12 3v8m0 0a3.5 3.5 0 0 1 3.5 3.5M12 11a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 18m0-7v7m0 0a3 3 0 0 0 3 3m-3-3a3 3 0 0 1-3 3" />
    </svg>
  );
}
