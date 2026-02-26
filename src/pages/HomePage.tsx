import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-wide.jpg";
import strawberryShake from "@/assets/strawberry-shake.jpg";
import chocolateShake from "@/assets/chocolate-shake.jpg";
import vanillaShake from "@/assets/vanilla-shake.jpg";
import latteImg from "@/assets/latte.jpg";

const featuredDrinks = [
  { name: "Strawberry Dream", price: "$7.50", image: strawberryShake, tag: "Best Seller" },
  { name: "Chocolate Bliss", price: "$7.50", image: chocolateShake, tag: "Fan Favorite" },
  { name: "Vanilla Cloud", price: "$6.50", image: vanillaShake, tag: "Classic" },
  { name: "Signature Latte", price: "$5.50", image: latteImg, tag: "New" },
];

const stats = [
  { icon: Star, label: "4.9 Rating", sub: "2,000+ reviews" },
  { icon: Clock, label: "Since 2018", sub: "Crafting happiness" },
  { icon: MapPin, label: "3 Locations", sub: "And growing" },
];

const HomePage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Shake & Brew coffeeshop interior"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl space-y-6"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-semibold font-body uppercase tracking-wider">
              Milkshakes & Coffee
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-background leading-tight">
              Sip Into <br />Happiness
            </h1>
            <p className="text-background/70 text-lg font-body max-w-md">
              Handcrafted milkshakes and artisan coffee made with the freshest ingredients. Every sip tells a story.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/menu">
                <Button size="lg" className="font-body bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-sm font-semibold">
                  Explore Menu <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="font-body h-12 px-8 text-sm border-background/30 text-background hover:bg-background/10">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-primary-foreground">{stat.label}</p>
                  <p className="text-primary-foreground/60 text-sm font-body">{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Drinks */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-accent text-sm font-semibold font-body uppercase tracking-wider">Our Favorites</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
              Fan Favorites
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto font-body">
              Loved by thousands, perfected over years. Try what everyone's talking about.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDrinks.map((drink, i) => (
              <motion.div
                key={drink.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold font-body">
                    {drink.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-foreground">{drink.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-accent font-bold font-body">{drink.price}</span>
                    <Button size="sm" variant="outline" className="text-xs font-body h-8 rounded-full">
                      Add to Order
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu">
              <Button variant="outline" size="lg" className="font-body h-12 px-8">
                View Full Menu <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground">
              Ready for your next favorite drink?
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              Visit us today or browse our full menu online. We can't wait to make you something special.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/menu">
                <Button size="lg" className="font-body bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">
                  Browse Menu
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="font-body h-12 px-8">
                  Find Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
