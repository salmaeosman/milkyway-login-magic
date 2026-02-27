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
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Coffee, Plus, Pencil, Trash2, LogOut, DollarSign } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type MenuItem = Tables<"menu_items">;
type Order = Tables<"orders">;

const AdminPage = () => {
  const { user, hasRole, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<"menu" | "orders">("menu");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "Milkshakes", image_url: "" });

  useEffect(() => {
    if (!loading && (!user || (!hasRole("admin") && !hasRole("owner")))) {
      navigate("/login");
    }
  }, [user, loading, hasRole, navigate]);

  useEffect(() => {
    fetchMenuItems();
    fetchOrders();
  }, []);

  const fetchMenuItems = async () => {
    const { data } = await supabase.from("menu_items").select("*").order("created_at", { ascending: false });
    setMenuItems(data ?? []);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data ?? []);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", description: "", price: "", category: "Milkshakes", image_url: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description ?? "",
      price: String(item.price),
      category: item.category,
      image_url: item.image_url ?? "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name,
      description: form.description || null,
      price: parseFloat(form.price),
      category: form.category,
      image_url: form.image_url || null,
    };

    if (editing) {
      const { error } = await supabase.from("menu_items").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Menu mis à jour" });
    } else {
      const { error } = await supabase.from("menu_items").insert(payload);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Item ajouté" });
    }
    setDialogOpen(false);
    fetchMenuItems();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("menu_items").delete().eq("id", id);
    toast({ title: "Item supprimé" });
    fetchMenuItems();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  };

  const updatePaymentStatus = async (id: string, payment_status: string) => {
    await supabase.from("orders").update({ payment_status }).eq("id", id);
    fetchOrders();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Coffee className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-primary-foreground/70 font-body">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="w-4 h-4 mr-2" /> Déconnexion
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={tab === "menu" ? "default" : "outline"}
            onClick={() => setTab("menu")}
            className="font-body"
          >
            <Coffee className="w-4 h-4 mr-2" /> Gestion du Menu
          </Button>
          <Button
            variant={tab === "orders" ? "default" : "outline"}
            onClick={() => setTab("orders")}
            className="font-body"
          >
            <DollarSign className="w-4 h-4 mr-2" /> Commandes & Paiements
          </Button>
        </div>

        {tab === "menu" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">Menu Items</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openAdd} className="font-body">
                    <Plus className="w-4 h-4 mr-2" /> Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-display">{editing ? "Modifier" : "Ajouter"} un item</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="font-body">Nom</Label>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="font-body" />
                    </div>
                    <div>
                      <Label className="font-body">Description</Label>
                      <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="font-body" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-body">Prix ($)</Label>
                        <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="font-body" />
                      </div>
                      <div>
                        <Label className="font-body">Catégorie</Label>
                        <select
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body"
                        >
                          <option>Milkshakes</option>
                          <option>Coffee</option>
                          <option>Specials</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label className="font-body">Image URL</Label>
                      <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="font-body" />
                    </div>
                    <Button onClick={handleSave} className="w-full font-body">
                      {editing ? "Mettre à jour" : "Ajouter"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-body">Nom</TableHead>
                    <TableHead className="font-body">Catégorie</TableHead>
                    <TableHead className="font-body">Prix</TableHead>
                    <TableHead className="font-body">Disponible</TableHead>
                    <TableHead className="font-body text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-body font-medium">{item.name}</TableCell>
                      <TableCell className="font-body">{item.category}</TableCell>
                      <TableCell className="font-body">${item.price}</TableCell>
                      <TableCell className="font-body">{item.available ? "✅" : "❌"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {menuItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground font-body py-8">
                        Aucun item dans le menu
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}

        {tab === "orders" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Commandes & Paiements</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-body">Client</TableHead>
                    <TableHead className="font-body">Total</TableHead>
                    <TableHead className="font-body">Statut</TableHead>
                    <TableHead className="font-body">Paiement</TableHead>
                    <TableHead className="font-body">Date</TableHead>
                    <TableHead className="font-body text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-body">
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-body font-semibold">${order.total}</TableCell>
                      <TableCell>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-xs font-body rounded-md border border-input bg-background px-2 py-1"
                        >
                          <option value="pending">En attente</option>
                          <option value="preparing">En préparation</option>
                          <option value="ready">Prêt</option>
                          <option value="completed">Terminé</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <select
                          value={order.payment_status}
                          onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
                          className="text-xs font-body rounded-md border border-input bg-background px-2 py-1"
                        >
                          <option value="unpaid">Non payé</option>
                          <option value="paid">Payé</option>
                          <option value="refunded">Remboursé</option>
                        </select>
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-xs text-muted-foreground font-body">{order.id.slice(0, 8)}...</span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {orders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground font-body py-8">
                        Aucune commande
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

export default AdminPage;
