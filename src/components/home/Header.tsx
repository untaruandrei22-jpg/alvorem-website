import { AlvoremLogoHorizontal, SearchIcon } from "@/components/BrandAssets";

const navItems = [
  { label: "Solutions", href: "#solutions", hasChevron: true },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Careers", href: "#founder" },
];

export function Header() {
  return (
    <header className="nav shell-wide" aria-label="Primary">
      <a href="#top" className="logo-link" aria-label="ALVOREM home">
        <AlvoremLogoHorizontal />
      </a>

      <nav aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
            {item.hasChevron ? <span className="nav-chevron" aria-hidden="true">⌄</span> : null}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <button className="search-button" type="button" aria-label="Search ALVOREM">
          <SearchIcon />
        </button>
        <a href="#contact" className="nav-project">Start a Project</a>
      </div>
    </header>
  );
}
