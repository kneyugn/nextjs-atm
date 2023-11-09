"use client";

import { useRouter } from "next/navigation";

export function NavigationButton(props: {
  route: string;
  text: string;
  secondary?: boolean;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(props.route);
      }}
      className={props.secondary ? "btn btn-default" : "btn btn-primary"}
    >
      {props.text}
    </button>
  );
}
