import { STUDIO_NAME } from "@/variables";
import "./footer.scss";

export default function Header() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrap">
          <p className="footer__copyright">
            &copy; 2026 {STUDIO_NAME}. All rights reserved.
          </p>
          <p className="footer__credit">Developed by bohsvity777</p>
        </div>
      </div>
    </footer>
  );
}
