import { Alert, Container } from "react-bootstrap";

type MessageProps = {
  message: string;
};

export function Message({ message }: MessageProps) {
  return (
    <section className="message mt-4">
      <Container>
        <div className="message__wrap">
          <Alert
            variant="success"
            className="message__detail text-center"
            show={!!message}
          >
            <h3>{message}</h3>
          </Alert>
        </div>
      </Container>
    </section>
  );
}
