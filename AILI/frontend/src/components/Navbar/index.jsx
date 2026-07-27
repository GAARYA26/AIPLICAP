import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globe, Bell, UserCircle2, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Documents", to: "/upload" },
  { label: "Analysis", to: "/analysis" },
  { label: "Compare", to: "/compare" },
  { label: "Q&A", to: "/qa" },
  { label: "Profile", to: "/settings" },
];

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal text-xs font-bold text-white">
            AI
          </span>
          <span className="text-base font-bold text-white">NyayaSetu</span>
        </Link>

        {/* Primary nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5"
            aria-label="Change language"
          >
            <Globe size={14} />
            EN
          </button>

          {isLoggedIn ? (
            <>
              <button
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5"
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger" />
              </button>

              {/* Generic account icon — swap for the real user's avatar/initials
                  once the Spring Boot auth API returns profile data. */}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-200 hover:bg-danger/20 hover:text-danger"
                aria-label="Log out"
                title="Log out"
              >
                <UserCircle2 size={17} className="group-hover:hidden" />
                <LogOut size={16} className="hidden group-hover:block" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button as={Link} to="/login" variant="ghost" className="!text-slate-200 !px-3.5 !py-2 !text-sm hover:!text-white">
                Log In
              </Button>
              <Button as={Link} to="/register" variant="teal" className="!px-3.5 !py-2 !text-sm">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
