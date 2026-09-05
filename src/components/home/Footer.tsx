import { AlvoremLogoHorizontal } from "@/components/BrandAssets";

export function Footer() {
  return (
    <footer className="footer shell-wide" id="footer">
      <a href="#top" className="footer-logo" aria-label="ALVOREM home">
        <AlvoremLogoHorizontal />
      </a>
      <p>© 2026 ALVOREM. Built with care in Romania.</p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
