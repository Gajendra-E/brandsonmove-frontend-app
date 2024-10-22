import AppRouter from "../approuter/AppRouter";

export default function Content({ resetSlider }: { resetSlider: boolean }) {
  return (
    <AppRouter resetSlider={resetSlider}/>
  );
}
