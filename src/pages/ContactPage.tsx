import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: MapPin, label: "Visit Us", value: "123 Brew Street, Downtown, NY 10001" },
  { icon: Phone, label: "Call Us", value: "(555) 123-4567" },
  { icon: Mail, label: "Email Us", value: "hello@shakeandbrew.com" },
  { icon: Clock, label: "Open Hours", value: "Mon–Fri 7am–9pm, Sat–Sun 8am–10pm" },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground">Get in Touch</h1>
            <p className="text-primary-foreground/70 mt-3 font-body text-lg max-w-md mx-auto">
              We'd love to hear from you. Drop us a line or stop by for a shake!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-body text-sm">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-12 font-body bg-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="font-body text-sm">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 font-body bg-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-body text-sm">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    className="min-h-[140px] font-body bg-card"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="font-body bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-full">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Find Us</h2>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4 items-start p-5 bg-card rounded-xl border border-border">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-foreground">{item.label}</p>
                      <p className="text-muted-foreground font-body text-sm mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden bg-secondary h-[250px] flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground font-body text-sm">Interactive map coming soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
