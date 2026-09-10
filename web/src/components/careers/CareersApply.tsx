"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Handshake,
  LineChart,
  MonitorSmartphone,
  Settings2,
  Upload,
} from "lucide-react";
import {
  CAREER_PATHS,
  CAREERS_EMAIL,
  CAREERS_FORM_ACTION,
  type CareerPath,
} from "@/content/careers";

const ICONS = {
  markets: LineChart,
  platform: MonitorSmartphone,
  partnerships: Handshake,
  operations: Settings2,
} as const;

const ACCEPT = ".pdf,.doc,.docx,application/pdf";
const MAX_BYTES = 5 * 1024 * 1024;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function CareersApply() {
  const [pathId, setPathId] = useState(CAREER_PATHS[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const fileId = useId();

  const path = CAREER_PATHS.find((item) => item.id === pathId) ?? CAREER_PATHS[0];

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] ?? null;
    setFile(next);
    if (errors.file) {
      setErrors((current) => ({ ...current, file: "" }));
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Enter your full name.";
    if (!email.trim()) next.email = "Enter your email.";
    else if (!isEmail(email.trim())) next.email = "Enter a valid email address.";
    if (!file) next.file = "Attach your CV.";
    else if (file.size > MAX_BYTES) next.file = "Keep the file under 5 MB.";
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      event.preventDefault();
      return;
    }
    setSent(true);
  };

  return (
    <div className="careers-apply">
      <div className="careers-paths-head">
        <h2 id="careers-paths-title">Choose a path</h2>
        <p>These are desks you can apply into — not a list of open jobs.</p>
      </div>

      <div className="careers-paths" role="radiogroup" aria-label="Application path">
        {CAREER_PATHS.map((item) => (
          <PathTile
            key={item.id}
            path={item}
            selected={item.id === path.id}
            onSelect={() => setPathId(item.id)}
          />
        ))}
      </div>

      <form
        className="careers-dock careers-glass"
        action={CAREERS_FORM_ACTION}
        method="POST"
        encType="multipart/form-data"
        onSubmit={onSubmit}
        noValidate
      >
        <input type="hidden" name="_subject" value={`Careers application — ${path.label}`} />
        <input type="hidden" name="path" value={path.label} />
        <input type="hidden" name="_template" value="table" />

        <div className="careers-dock__head">
          <p className="careers-eyebrow">Applying for {path.label}</p>
          <h3>Send an application</h3>
        </div>

        <div className={`careers-field${errors.name ? " is-invalid" : ""}`}>
          <label htmlFor="careers-name">Full name</label>
          <input
            id="careers-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            value={name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "careers-name-error" : undefined}
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) setErrors((current) => ({ ...current, name: "" }));
            }}
          />
          {errors.name ? (
            <p className="careers-field__error" id="careers-name-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={`careers-field${errors.email ? " is-invalid" : ""}`}>
          <label htmlFor="careers-email">Email</label>
          <input
            id="careers-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "careers-email-error" : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors((current) => ({ ...current, email: "" }));
            }}
          />
          {errors.email ? (
            <p className="careers-field__error" id="careers-email-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className={`careers-file${errors.file ? " is-invalid" : ""}`}>
          <label htmlFor={fileId}>
            <span className="careers-file__icon" aria-hidden="true">
              <Upload size={20} strokeWidth={1.8} />
            </span>
            <span>
              <strong>{file ? file.name : "Upload your CV"}</strong>
              <small>PDF or Word · up to 5 MB</small>
            </span>
          </label>
          <input
            id={fileId}
            name="attachment"
            type="file"
            accept={ACCEPT}
            aria-invalid={errors.file ? true : undefined}
            aria-describedby={errors.file ? "careers-file-error" : undefined}
            onChange={onFile}
          />
          {errors.file ? (
            <p className="careers-field__error" id="careers-file-error">
              {errors.file}
            </p>
          ) : null}
        </div>

        <button className="careers-button" type="submit">
          Send application
        </button>

        {sent ? (
          <p className="careers-dock__status" role="status">
            Sending to {CAREERS_EMAIL}. If nothing happens, email that address
            directly and attach your CV.
          </p>
        ) : null}
      </form>
    </div>
  );
}

function PathTile({
  path,
  selected,
  onSelect,
}: {
  path: CareerPath;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = ICONS[path.id as keyof typeof ICONS];

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`careers-path${selected ? " is-selected" : ""}`}
      onClick={onSelect}
    >
      <span className="careers-path__icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <span className="careers-path__copy">
        <strong>{path.label}</strong>
        <small>{path.hint}</small>
      </span>
    </button>
  );
}
