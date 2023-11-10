export function Main(props: { children?: ReactNode }): ReactNode {
  return (
    <main className="m-8 flex justify-center">
      <div className="flex gap-4">{props.children}</div>
    </main>
  );
}
