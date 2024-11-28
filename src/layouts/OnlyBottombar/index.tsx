import { Outlet } from "react-router-dom";
import BottomBar from "../components/BottomBar";

export default function OnlyBottomBar() {
  return (
    <>
      <main className="fixed top-0 inset-x-0 bottom-[--h-bottom-bar]">
        <Outlet />
      </main>
      <BottomBar />
    </>
  )
}
