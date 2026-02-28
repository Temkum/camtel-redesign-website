'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Home,
  Package,
  Settings,
  HelpCircle,
  Menu,
  User,
  LogOut,
  Key,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useActivePath } from '@/hooks/use-active-path';
import { useAuth } from '@/lib/auth-context';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Product', href: '/dashboard/services', icon: Package },
  { name: 'Service', href: '/dashboard/account', icon: Settings },
  { name: 'Support', href: '/dashboard/support', icon: HelpCircle },
];

export function DashboardHeader() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { checkActive } = useActivePath();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/camtel.png"
            alt="Camtel"
            className="h-12 w-12 object-contain"
          />
          <div className="hidden md:block">
            <span className="text-xl font-bold text-primary">Camtel</span>
            <p className="text-xs text-muted-foreground">
              ...Et ce n'est pas fini!
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer',
                checkActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary',
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground transition-all duration-200 hover:text-foreground"
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'English' : 'Francais'}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="animate-in fade-in-0 zoom-in-95"
              >
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={
                    language === 'en'
                      ? 'bg-secondary cursor-pointer mb-1'
                      : 'cursor-pointer'
                  }
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('fr')}
                  className={
                    language === 'fr'
                      ? 'bg-secondary cursor-pointer mb-1'
                      : 'cursor-pointer'
                  }
                >
                  Francais
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Menu or Login Button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Service: {user.serviceId}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/account">
                    <User className="mr-2 h-4 w-4" />
                    Customer Information
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 mt-6">
                {user ? (
                  <div className="px-2 py-4 border-b border-border">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Service: {user.serviceId}
                    </p>
                  </div>
                ) : (
                  <div className="px-2 py-4 border-b border-border">
                    <Button asChild className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                  </div>
                )}
                <nav className="flex flex-col gap-1">
                  {navigation.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(item.href + '/');
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-secondary',
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-2 px-3 text-sm">
                    <button
                      onClick={() => setLanguage('fr')}
                      className={
                        language === 'fr'
                          ? 'text-blue-500 hover:text-primary'
                          : ''
                      }
                    >
                      English
                    </button>
                    <span>|</span>
                    <button className="hover:text-primary">French</button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
