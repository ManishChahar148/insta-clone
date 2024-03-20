import React from "react";

interface Props {
  children: React.ReactNode;
}

const AppBody = (props: Props) => {
  const { children } = props;
  return <div className="w-full h-full">{children}</div>;
};

export default AppBody;
