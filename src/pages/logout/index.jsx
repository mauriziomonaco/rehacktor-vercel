import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase-client";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      navigate("/", { replace: true }); // Torna alla home
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-[50vh] text-center">
      <p className="text-lg font-semibold">Logout in corso...</p>
    </div>
  );
}
