
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { UserRound, Settings, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProfileDropdown() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Unable to log out. Please try again.");
    }
  };

  return (
    &lt;DropdownMenu.Root&gt;
      &lt;DropdownMenu.Trigger asChild&gt;
        &lt;button
          type="button"
          aria-label="Open account menu"
          className="flex items-center gap-2 rounded-xl
                     px-3 py-2 text-slate-200
                     transition hover:bg-slate-800
                     focus-visible:outline-2
                     focus-visible:outline-blue-500"
        &gt;
          &lt;div className="flex h-9 w-9 items-center
                          justify-center rounded-full
                          bg-blue-600"&gt;
            &lt;UserRound size={19} /&gt;
          &lt;/div&gt;

          &lt;ChevronDown size={16} /&gt;
        &lt;/button&gt;
      &lt;/DropdownMenu.Trigger&gt;

      &lt;DropdownMenu.Portal&gt;
        &lt;DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={8}
          className="z-50 w-60 rounded-xl border
                     border-slate-200 bg-white p-2
                     shadow-xl outline-none
                     data-[state=open]:animate-in"
        &gt;
          &lt;DropdownMenu.Label className="px-3 py-3"&gt;
            &lt;p className="text-sm font-semibold text-slate-900"&gt;
              My Account
            &lt;/p&gt;
            &lt;p className="text-xs text-slate-500"&gt;
              Manage your AutoJob account
            &lt;/p&gt;
          &lt;/DropdownMenu.Label&gt;

          &lt;DropdownMenu.Separator className="my-1 h-px bg-slate-200" /&gt;

          &lt;DropdownMenu.Item
            onSelect={() =&gt; navigate("/profile")}
            className="flex cursor-pointer items-center gap-3
                       rounded-lg px-3 py-2.5 text-sm
                       text-slate-700 outline-none
                       focus:bg-slate-100"
          &gt;
            &lt;UserRound size={18} /&gt;
            My Profile
          &lt;/DropdownMenu.Item&gt;

          &lt;DropdownMenu.Item
            onSelect={() =&gt; navigate("/settings")}
            className="flex cursor-pointer items-center gap-3
                       rounded-lg px-3 py-2.5 text-sm
                       text-slate-700 outline-none
                       focus:bg-slate-100"
          &gt;
            &lt;Settings size={18} /&gt;
            Settings
          &lt;/DropdownMenu.Item&gt;

          &lt;DropdownMenu.Separator className="my-1 h-px bg-slate-200" /&gt;

          &lt;DropdownMenu.Item
            onSelect={() =&gt; void handleLogout()}
            className="flex cursor-pointer items-center gap-3
                       rounded-lg px-3 py-2.5 text-sm
                       text-red-600 outline-none
                       focus:bg-red-50"
          &gt;
            &lt;LogOut size={18} /&gt;
            Log out
          &lt;/DropdownMenu.Item&gt;
        &lt;/DropdownMenu.Content&gt;
      &lt;/DropdownMenu.Portal&gt;
    &lt;/DropdownMenu.Root&gt;
  );
}
