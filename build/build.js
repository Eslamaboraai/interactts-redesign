/* Static site generator for Interact TS redesign.
   Assembles final HTML pages from shared partials + per-page main content. */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const bd = __dirname;
const read = (p) => fs.readFileSync(p, "utf8");

const headTmpl = read(path.join(bd, "head.tmpl.html"));
const headerTmpl = read(path.join(bd, "header.tmpl.html"));
const footerTmpl = read(path.join(bd, "footer.tmpl.html"));

const ACTIVE = 'aria-current="page"';
function header(active) {
  const keys = ["home", "about", "solutions", "products", "services", "media"];
  let h = headerTmpl;
  keys.forEach((k) => { h = h.replace(`{{${k}}}`, k === active ? ACTIVE : ""); });
  return h;
}

// Build the 50 client logo tiles in the exact captured order: 16..61, then 65,62,63,64
function clientLogos() {
  const nums = [];
  for (let i = 16; i <= 61; i++) nums.push(i);
  nums.push(65, 62, 63, 64);
  return nums
    .map(
      (n) =>
        `<div class="logo-tile"><img src="https://www.interactts.com/wp-content/uploads/2019/02/Picture${n}.png" alt="Interact client" loading="lazy" /></div>`
    )
    .join("\n      ");
}

const pages = [
  { file: "solutions.html", active: "solutions", title: "Solutions — Interact Technology Solutions", desc: "Business, cloud and imaging & printing solutions delivered with the latest technologies and best practices.", canon: "https://www.interactts.com/solutions/" },
  { file: "products.html", active: "products", title: "Products — Interact Technology Solutions", desc: "A full range of hardware, cloud, servers, printers, security and networking products from 20+ leading global IT vendors.", canon: "https://www.interactts.com/products/" },
  { file: "services.html", active: "services", title: "Services — Interact Technology Solutions", desc: "Hardware, IT infrastructure & data center, outsourcing, consulting and deployment & integration services.", canon: "https://www.interactts.com/services/" },
  { file: "industries.html", active: "about", title: "Industries — Interact Technology Solutions", desc: "Customized solutions and expertise across 24 industries, from multinational and local companies to the governmental sector.", canon: "https://www.interactts.com/corporate-profile/industries/" },
  { file: "partners.html", active: "about", title: "Partners and Associations — Interact Technology Solutions", desc: "Interact's partnerships and associations with leading global IT vendors.", canon: "https://www.interactts.com/corporate-profile/partners-and-associations/" },
  { file: "clients.html", active: "about", title: "Our Clients — Interact Technology Solutions", desc: "Some of the major Egyptian and international companies we are honored to work with since 1996.", canon: "https://www.interactts.com/corporate-profile/clients/" },
  { file: "certificates-and-awards.html", active: "about", title: "Certificates and Awards — Interact Technology Solutions", desc: "Certifications and awards recognizing Interact's partnerships and service excellence.", canon: "https://www.interactts.com/corporate-profile/certificates-and-awards/" },
  { file: "contact.html", active: "", title: "Contact Us — Interact Technology Solutions", desc: "Get a free consultation or contact a department directly. Headquarters in Zahraa El-Maadi, Maadi, Cairo.", canon: "https://www.interactts.com/contact-us/" },
  { file: "news.html", active: "media", title: "News — Interact Technology Solutions", desc: "The latest announcements, awards and milestones from Interact Technology Solutions.", canon: "https://www.interactts.com/news/" },
  { file: "events.html", active: "media", title: "Events — Interact Technology Solutions", desc: "Interact events, conferences and gatherings.", canon: "https://www.interactts.com/events/" },
  { file: "case-studies.html", active: "media", title: "Case Studies and Projects — Interact Technology Solutions", desc: "A closer look at the projects we deliver and the results we achieve for our clients.", canon: "https://www.interactts.com/case-studies/" },
];

pages.forEach((p) => {
  let main = read(path.join(bd, "main", p.file));
  if (p.file === "clients.html") main = main.replace("{{CLIENT_LOGOS}}", clientLogos());
  let head = headTmpl
    .replace(/\{\{TITLE\}\}/g, p.title)
    .replace(/\{\{DESC\}\}/g, p.desc)
    .replace(/\{\{CANON\}\}/g, p.canon);
  const out = head + "\n" + header(p.active) + "\n\n" + main + "\n\n" + footerTmpl;
  fs.writeFileSync(path.join(root, p.file), out);
  console.log("built", p.file);
});
console.log("Done:", pages.length, "pages");
