import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/coffeeshop-hero.jpg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        toast({ title: "Erreur", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Vérifiez votre email", description: "Un lien de confirmation a été envoyé." });
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Erreur", description: error.message, variant: "destructive" });
      } else if (data.user) {
        // Check roles and redirect
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id);

        const userRoles = (roles ?? []).map((r) => r.role);
        if (userRoles.includes("owner")) {
          navigate("/owner");
        } else if (userRoles.includes("admin")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={heroImage}
          alt="Delicious milkshakes and coffee drinks"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <h2 className="font-display text-4xl font-bold text-primary-foreground mb-3">
            Shake & Brew
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-md font-body">
            Where creamy milkshakes meet artisan coffee. Your daily dose of happiness awaits.
          </p>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-2">
              <Coffee className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {isSignUp ? "Créer un compte" : "Bienvenue"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isSignUp ? "Inscrivez-vous sur Shake & Brew" : "Connectez-vous à votre compte"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                  Nom complet
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Jean Dupont"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 bg-card border-border font-body"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@shakenandbrew.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-card border-border font-body"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-card border-border pr-11 font-body"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-sm font-semibold font-body bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
            >
              {loading ? "Chargement..." : isSignUp ? "S'inscrire" : "Se connecter"}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-accent hover:text-accent/80 font-semibold transition-colors"
            >
              {isSignUp ? "Se connecter" : "S'inscrire"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
