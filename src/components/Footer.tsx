import { Link } from "react-router-dom";
import { Coffee, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">Shake & Brew</span>
            </div>
            <p className="text-primary-foreground/70 text-sm font-body leading-relaxed">
              Where creamy milkshakes meet artisan coffee. Handcrafted with love since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Explore
            </h4>
            <div className="space-y-2 font-body">
              {[
                { label: "Menu", to: "/menu" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Hours
            </h4>
            <div className="space-y-2 font-body text-sm text-primary-foreground/70">
              <p>Mon – Fri: 7am – 9pm</p>
              <p>Saturday: 8am – 10pm</p>
              <p>Sunday: 8am – 8pm</p>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/40 text-xs font-body">
            © 2026 Shake & Brew. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
