import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import strawberryShake from "@/assets/strawberry-shake.jpg";
import chocolateShake from "@/assets/chocolate-shake.jpg";
import vanillaShake from "@/assets/vanilla-shake.jpg";
import latteImg from "@/assets/latte.jpg";
import coffeeshopHero from "@/assets/coffeeshop-hero.jpg";

const categories = ["All", "Milkshakes", "Coffee", "Specials"];

const drinks = [
  { name: "Strawberry Dream", price: "$7.50", desc: "Fresh strawberries, vanilla ice cream, whipped cream", category: "Milkshakes", image: strawberryShake },
  { name: "Chocolate Bliss", price: "$7.50", desc: "Belgian chocolate, cream, chocolate drizzle", category: "Milkshakes", image: chocolateShake },
  { name: "Vanilla Cloud", price: "$6.50", desc: "Madagascar vanilla bean, premium cream", category: "Milkshakes", image: vanillaShake },
  { name: "Cookies & Cream", price: "$8.00", desc: "Crushed cookies, vanilla ice cream, Oreo crumble", category: "Milkshakes", image: vanillaShake },
  { name: "Caramel Swirl", price: "$7.50", desc: "Salted caramel, toffee bits, whipped cream", category: "Specials", image: chocolateShake },
  { name: "Matcha Shake", price: "$8.50", desc: "Ceremonial matcha, oat milk, honey", category: "Specials", image: coffeeshopHero },
  { name: "Signature Latte", price: "$5.50", desc: "Double shot espresso, steamed milk, latte art", category: "Coffee", image: latteImg },
  { name: "Cappuccino", price: "$5.00", desc: "Espresso, steamed milk, thick foam", category: "Coffee", image: latteImg },
  { name: "Cold Brew", price: "$5.50", desc: "24-hour steeped, smooth, bold flavor", category: "Coffee", image: latteImg },
  { name: "Mocha Latte", price: "$6.50", desc: "Espresso, chocolate, steamed milk, cocoa", category: "Coffee", image: chocolateShake },
  { name: "Espresso", price: "$3.50", desc: "Single origin, rich crema", category: "Coffee", image: latteImg },
  { name: "Shake & Brew Special", price: "$9.50", desc: "Coffee milkshake with espresso shot & cream", category: "Specials", image: coffeeshopHero },
];

const MenuPage = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? drinks : drinks.filter((d) => d.category === active);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-primary-foreground/60 text-sm font-semibold font-body uppercase tracking-wider">
              What We Serve
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mt-2">
              Our Menu
            </h1>
            <p className="text-primary-foreground/70 mt-3 max-w-md mx-auto font-body">
              Every drink is handcrafted with love and the finest ingredients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 justify-center flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={active === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActive(cat)}
                className={`font-body rounded-full h-9 px-5 text-sm ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((drink, i) => (
              <motion.div
                key={drink.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden bg-secondary">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/90 text-foreground text-xs font-bold font-body">
                    {drink.price}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">{drink.name}</h3>
                      <p className="text-muted-foreground text-sm font-body mt-1">{drink.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-body text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                      {drink.category}
                    </span>
                    <Button size="sm" className="text-xs font-body h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Add to Order
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;
