import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

export default function Layout (){
  const handleLogin = () => {
    const callbackURL = `${window.location.href}callback/auth`;
    window.location.href = `${import.meta.env.VITE_BETTER_AUTH_URL}/login?callbackUrl=${encodeURIComponent(callbackURL)}`;
  }
  return (
    <div className="w-full">
      <div className="w-full flex flex-row h-fit border-b-2 justify-between">
        <div className="flex items-center p-2">
          <p>One calendar</p>
        </div>
        <div className="flex items-center flex-row p-2">
          <Button variant="secondary" size="lg" onClick={handleLogin}>Login</Button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}