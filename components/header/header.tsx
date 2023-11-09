export function Header(props: { secondaryHeader: string }) {
  const secondaryHeader = props.secondaryHeader;
  return (
    <div className="navbar bg-base-300">
      <h1>ATM: Evergreen Bank: {secondaryHeader}</h1>
    </div>
  );
}
