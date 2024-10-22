import Navbar from "../navbar/Navbar";



export default function Header({ onTabChange }: { onTabChange: () => void }) {
  return (
    <header>
      <Navbar onTabChange={onTabChange} />
    </header>
  );
}
