"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "info@dominionmarkets.com";

type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "message";

type FormState = Record<FieldName, string> & { newsletter: boolean };

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
  newsletter: false,
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sent, setSent] = useState(false);

  const setField = (name: FieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const validate = () => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!values.firstName.trim()) next.firstName = "Enter your first name.";
    if (!values.lastName.trim()) next.lastName = "Enter your last name.";
    if (!values.email.trim()) next.email = "Enter your email.";
    else if (!isEmail(values.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) next.message = "Tell us what is on your mind.";
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const lines = [
      `Name: ${values.firstName.trim()} ${values.lastName.trim()}`,
      `Email: ${values.email.trim()}`,
      values.phoneNumber.trim() ? `Phone: ${values.phoneNumber.trim()}` : "",
      `Newsletter: ${values.newsletter ? "Yes" : "No"}`,
      "",
      values.message.trim(),
    ].filter((line, index, all) => line !== "" || all[index + 1] === "");

    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Website enquiry",
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = href;
    setSent(true);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__row">
        <Field
          id="firstName"
          label="First name"
          placeholder="First name"
          autoComplete="given-name"
          value={values.firstName}
          error={errors.firstName}
          onChange={(value) => setField("firstName", value)}
        />
        <Field
          id="lastName"
          label="Last name"
          placeholder="Last name"
          autoComplete="family-name"
          value={values.lastName}
          error={errors.lastName}
          onChange={(value) => setField("lastName", value)}
        />
      </div>
      <Field
        id="email"
        label="Email"
        type="email"
        placeholder="Your email"
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={(value) => setField("email", value)}
      />
      <Field
        id="phoneNumber"
        label="Phone number"
        type="tel"
        placeholder="Phone number"
        autoComplete="tel"
        value={values.phoneNumber}
        error={errors.phoneNumber}
        onChange={(value) => setField("phoneNumber", value)}
      />
      <Field
        id="message"
        label="Message"
        placeholder="What's on your mind?"
        multiline
        value={values.message}
        error={errors.message}
        onChange={(value) => setField("message", value)}
      />

      <label className="contact-check">
        <input
          type="checkbox"
          name="newsletter"
          checked={values.newsletter}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              newsletter: event.target.checked,
            }))
          }
        />
        <span>Sign up to stay updated. You can unsubscribe at any time.</span>
      </label>

      <button className="contact-button" type="submit">
        Send Message
      </button>

      {sent ? (
        <p className="contact-form__status" role="status">
          Your email app should open with the message ready to send. If it does
          not, write to{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  autoComplete,
  multiline = false,
}: {
  id: FieldName;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className={`contact-field${error ? " is-invalid" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {error ? (
        <p className="contact-field__error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
