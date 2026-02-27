import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Coffee, Crown, Plus, Trash2, LogOut, Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

interface AdminUser {
  id: string;
  user_id: string;
  role: "admin" | "owner";
  created_at: string;
  profile?: { email: string; full_name: string | null };
}

const OwnerPage = () => {
  const { user, hasRole, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    paidOrders: 0,
    pendingOrders: 0,
    menuItemCount: 0,
    adminCount: 0,
  });
  const [tab, setTab] = useState<"stats" | "admins">("stats");

  useEffect(() => {
    if (!loading && (!user || !hasRole("owner"))) {
      navigate("/login");
    }
  }, [user, loading, hasRole, navigate]);

  useEffect(() => {
    fetchAdmins();
    fetchStats();
  }, []);

  const fetchAdmins = async () => {
    const { data: rolesData } = await supabase
      .from("user_roles")
      .select("*")
      .eq("role", "admin");

    if (rolesData && rolesData.length > 0) {
      const userIds = rolesData.map((r) => r.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", userIds);

      const merged = rolesData.map((r) => ({
        ...r,
        profile: profiles?.find((p) => p.user_id === r.user_id),
      }));
      setAdmins(merged as AdminUser[]);
    } else {
      setAdmins([]);
    }
  };

  const fetchStats = async () => {
    const [ordersRes, menuRes, adminsRes] = await Promise.all([
      supabase.from("orders").select("*"),
      supabase.from("menu_items").select("id", { count: "exact" }),
      supabase.from("user_roles").select("id", { count: "exact" }).eq("role", "admin"),
    ]);

    const orders = ordersRes.data ?? [];
    setStats({
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + Number(o.total), 0),
      paidOrders: orders.filter((o) => o.payment_status === "paid").length,
      pendingOrders: orders.filter((o) => o.status === "pending").length,
      menuItemCount: menuRes.count ?? 0,
      adminCount: adminsRes.count ?? 0,
    });
  };

  const addAdmin = async () => {
    if (!newAdminEmail.trim()) return;

    // Find user by email in profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("user_id")
      .eq("email", newAdminEmail.trim())
      .single();

    if (!profile) {
      toast({ title: "Erreur", description: "Utilisateur non trouvé. Il doit d'abord créer un compte.", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("user_roles").insert({
      user_id: profile.user_id,
      role: "admin" as const,
    });

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Admin ajouté avec succès" });
    setNewAdminEmail("");
    fetchAdmins();
    fetchStats();
  };

  const removeAdmin = async (roleId: string) => {
    await supabase.from("user_roles").delete().eq("id", roleId);
    toast({ title: "Admin supprimé" });
    fetchAdmins();
    fetchStats();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Coffee className="w-8 h-8 animate-spin text-primary" /></div>;

  const statCards = [
    { label: "Commandes totales", value: stats.totalOrders, icon: ShoppingCart, color: "text-primary" },
    { label: "Revenu total", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-accent" },
    { label: "Commandes payées", value: stats.paidOrders, icon: TrendingUp, color: "text-primary" },
    { label: "En attente", value: stats.pendingOrders, icon: ShoppingCart, color: "text-muted-foreground" },
    { label: "Items au menu", value: stats.menuItemCount, icon: Coffee, color: "text-primary" },
    { label: "Admins", value: stats.adminCount, icon: Users, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <Crown className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">Owner Dashboard</h1>
              <p className="text-sm opacity-70 font-body">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-background hover:bg-background/10">
            <LogOut className="w-4 h-4 mr-2" /> Déconnexion
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={tab === "stats" ? "default" : "outline"}
            onClick={() => setTab("stats")}
            className="font-body"
          >
            <TrendingUp className="w-4 h-4 mr-2" /> Statistiques
          </Button>
          <Button
            variant={tab === "admins" ? "default" : "outline"}
            onClick={() => setTab("admins")}
            className="font-body"
          >
            <Users className="w-4 h-4 mr-2" /> Gérer les Admins
          </Button>
        </div>

        {tab === "stats" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Vue d'ensemble</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {statCards.map((stat) => (
                <Card key={stat.label} className="border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-body font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "admins" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Gérer les Administrateurs</h2>

            {/* Add admin */}
            <div className="bg-card rounded-xl border border-border p-6 mb-6">
              <Label className="font-body text-sm font-medium">Ajouter un admin par email</Label>
              <div className="flex gap-3 mt-2">
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="font-body"
                />
                <Button onClick={addAdmin} className="font-body">
                  <Plus className="w-4 h-4 mr-2" /> Ajouter
                </Button>
              </div>
              <p className="text-xs text-muted-foreground font-body mt-2">
                L'utilisateur doit d'abord avoir un compte sur la plateforme.
              </p>
            </div>

            {/* Admin list */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-body">Email</TableHead>
                    <TableHead className="font-body">Nom</TableHead>
                    <TableHead className="font-body">Ajouté le</TableHead>
                    <TableHead className="font-body text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-body">{admin.profile?.email ?? "—"}</TableCell>
                      <TableCell className="font-body">{admin.profile?.full_name ?? "—"}</TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {new Date(admin.created_at).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => removeAdmin(admin.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {admins.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground font-body py-8">
                        Aucun administrateur
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OwnerPage;
