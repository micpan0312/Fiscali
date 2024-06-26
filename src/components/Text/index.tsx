import React from "react";

const sizes = {
  xs: "text-xs font-medium",
  lg: "text-2xl font-medium md:text-[22px]",
  s: "text-sm font-normal",
  xl: "text-4xl font-medium md:text-[34px] sm:text-[32px]",
  md: "text-base font-medium",
};

export type TextProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  as,
  size = "s",
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
