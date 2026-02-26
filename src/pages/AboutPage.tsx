import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import aboutInterior from "@/assets/about-interior.jpg";
import coffeeshopHero from "@/assets/coffeeshop-hero.jpg";
import { Heart, Leaf, Award } from "lucide-react";

const values = [
  { icon: Heart, title: "Made with Love", desc: "Every drink is crafted with passion and attention to detail." },
  { icon: Leaf, title: "Fresh Ingredients", desc: "We source locally and use only the finest, freshest ingredients." },
  { icon: Award, title: "Award Winning", desc: "Recognized for quality by coffee and food critics nationwide." },
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <img src={aboutInterior} alt="Our cozy interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-background">Our Story</h1>
            <p className="text-background/70 mt-3 font-body text-lg max-w-md mx-auto">
              From a small kitchen dream to your favorite neighborhood café.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-accent text-sm font-semibold font-body uppercase tracking-wider">Est. 2018</span>
              <h2 className="font-display text-4xl font-bold text-foreground">
                A love story between milkshakes and coffee
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  It all started when two friends — one a milkshake fanatic, the other a coffee purist — realized they could create something magical by bringing their passions together.
                </p>
                <p>
                  Shake & Brew was born in a tiny kitchen in downtown, where we experimented with flavor combinations that nobody had tried before. Our coffee-infused shakes and shake-inspired lattes quickly became the talk of the town.
                </p>
                <p>
                  Today, we've grown to three locations, but our mission remains the same: craft drinks that make people smile, using only the freshest, highest-quality ingredients.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
            >
              <img src={coffeeshopHero} alt="Our drinks" className="w-full h-[500px] object-cover rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-secondary-foreground">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 text-center border border-border"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
