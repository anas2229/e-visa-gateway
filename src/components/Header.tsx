import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, FileText, LayoutDashboard, Home } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-border/50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">
            نظام التأشيرة الإلكترونية
          </span>
        </Link>

        <nav className="flex items-center gap-2 md:gap-4">
          {user ? (
            <>
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  <span className="hidden md:inline">الرئيسية</span>
                </Button>
              </Link>

              {user.isAdmin ? (
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden md:inline">لوحة التحكم</span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/apply">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="hidden md:inline">تقديم طلب</span>
                    </Button>
                  </Link>
                  <Link to="/status">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      <span className="hidden md:inline">حالة الطلب</span>
                    </Button>
                  </Link>
                </>
              )}

              <div className="flex items-center gap-3 mr-2 pr-2 border-r border-border">
                <span className="text-sm text-muted-foreground hidden md:block">
                  مرحباً، {user.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">خروج</span>
                </Button>
              </div>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="hero" size="sm">
                تسجيل الدخول
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
