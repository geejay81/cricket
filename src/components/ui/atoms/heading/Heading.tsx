import type { HTMLAttributes } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level: HeadingLevel;
};

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

const headingSizes: Record<HeadingLevel, string> = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
};

const Heading = ({ level, className, ...otherProps }: HeadingProps) => {
  const Tag = headingTags[level];

  return (
    <Tag
      className={`${headingSizes[level]} font-bold${className ? ` ${className}` : ""}`}
      {...otherProps}
    />
  );
};

export default Heading;