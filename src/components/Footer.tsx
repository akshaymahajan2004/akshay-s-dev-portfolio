import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/akshaymahajan", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/akshaymahajan", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/akshaymahajan", label: "Twitter" },
  { icon: Mail, href: "mailto:akshay@example.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 <span className="text-primary font-medium">Akshay Mahajan</span> | All Rights Reserved
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
