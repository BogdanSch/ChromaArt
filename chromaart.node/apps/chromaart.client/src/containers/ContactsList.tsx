import { useSocials } from "@/contexts/SocialsContext";
import { getIconClass } from "@/utils/iconHelper";
import { Alert } from "react-bootstrap";
import "./contact.scss";

export default function ContactsList() {
  const { data, isLoading, error } = useSocials();

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (error?.isNullOrWhitespace()) {
    return (
      <Alert variant="danger" show={true}>
        {error}
      </Alert>
    );
  }
  return (
    <ul className="contact__list">
      {data.map((link, i) => {
        return (
          <li className="contact__item" key={`contact-link-${i}`}>
            <a href={link.url} target="_blank" className="contact__link">
              <i
                className={`contact__icon ${getIconClass(link.platformName)}`}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
