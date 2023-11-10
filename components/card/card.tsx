import { ReactNode } from "react";

export function Card(props: { children?: ReactNode }): ReactNode {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body justify-between">{props.children}</div>
      </div>
    </>
  );
}
