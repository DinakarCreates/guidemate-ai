import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/1000130932.png";
import { supabase } from "@/lib/supabase";

export default function Splash() {
  const nav = useNavigate();
  useEffect(() => {
  async function checkUser() {
    
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const { data: { user } } = await supabase.auth.getUser();

    console.log("Logged in user:", user);

    if (!user) {
      nav("/welcome");
      return;
    }
    const { data: profile } = await supabase
  .from("profiles")
  .select("onboarding_completed")
  .eq("id", user.id)
  .single();

if (profile?.onboarding_completed) {
  nav("/home");
} else {
  nav("/onboarding");
}
  }

  checkUser();
}, [nav]);

  return (
    <div className="app-shell items-center justify-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 animate-fade-in">
        <div className="animate-fade-in">
  <img src={logo}alt="GuideMate"className="w-48 h-auto animate-pulse"/></div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
  GuideMate</h1>
<p className="mt-2 text-sm text-muted-foreground">
  Become your future self.</p>
        </div>
      </div>
    </div>
  );
}
