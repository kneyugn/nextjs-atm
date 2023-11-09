"use client";

import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

export function NavigationButton(props: {
  route: string;
  text: string;
  secondary?: boolean;
}) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        if (props.route === "logout") {
          await fetch("/api/token/invalidate", { method: "POST" });
          const cookies = new Cookies();
          cookies.remove("access_token");
          cookies.remove("refresh_token");
          router.push("/");
          return;
        }
        router.push(props.route);
        router.refresh();
      }}
      className={props.secondary ? "btn btn-default" : "btn btn-primary"}
    >
      {props.text}
    </button>
  );
}
