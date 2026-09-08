import { requireAdminPage } from "@/lib/adminAuth";
import LogoutButton from "./LogoutButton";

export default function AdminHome() {
  requireAdminPage();

  const links = [
    { href: "/admin/hours", label: "Smoothie Hours", desc: "Set next week's open/close times" },
    { href: "/admin/menu", label: "Smoothie Menu", desc: "Add, edit, or remove menu items" },
    { href: "/admin/trainers", label: "Trainers", desc: "Edit trainer bios and certifications" },
    { href: "/admin/schedule", label: "Assessment Schedule", desc: "Set next week's open assessment slots" },
    { href: "/admin/bookings", label: "Bookings", desc: "See everyone who has booked a service" },
    { href: "/admin/nutrition", label: "Nutrition Pathway Responses", desc: "See questionnaire answers and leads" },
  ];

  return (
    <div className="section wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin</h1>
        <LogoutButton />
      </div>

      <div className="grid grid-2" style={{ marginTop: 20 }}>
        {links.map((l) => (
          <a className="card" key={l.href} href={l.href} style={{ textDecoration: "none" }}>
            <h2 style={{ marginBottom: 4 }}>{l.label}</h2>
            <p className="muted">{l.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
