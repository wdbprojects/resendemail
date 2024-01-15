interface ContactFormEmailProps {
  username: string;
  email: string;
  message: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  username,
  email,
  message,
}) => {
  return (
    <div>
      <h1>Contact form submission</h1>
      <p>
        From{" "}
        <strong>
          {username} at {email}
        </strong>
      </p>
      <h2>Message</h2>
      <p>{message}</p>
    </div>
  );
};

export default ContactFormEmail;
