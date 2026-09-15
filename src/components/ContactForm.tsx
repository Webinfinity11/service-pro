"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendEnquiry, type FormState } from "@/app/[lang]/contact/actions";
import { useI18n } from "./LangProvider";

const initial: FormState | null = null;

export default function ContactForm() {
  const [state, action] = useActionState(sendEnquiry, initial);
  const { lang, t } = useI18n();

  return (
    <form action={action} className="border border-line bg-white p-8 lg:p-10">
      <input type="hidden" name="lang" value={lang} />
      <p className="tag text-red-ink">{t.common.writeUs}</p>
      <h2 className="display-ge mt-4 text-xl">
        {t.contact.formTitle}
      </h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field name="name" label={t.contact.name} required autoComplete="name" />
        <Field
          name="email"
          label={t.common.email}
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className="mt-5">
        <Field name="subject" label={t.contact.subject} />
      </div>
      <div className="mt-5">
        <label className="tag block text-slate" htmlFor="body">
          {t.contact.message} <span className="text-red-ink">*</span>
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={6}
          maxLength={4000}
          className="mt-2.5 w-full resize-y border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-red-ink"
        />
      </div>

      <Submit />

      {state && (
        <p
          role="status"
          className={`mt-5 border-l-2 py-2 pl-4 text-sm ${
            state.ok
              ? "border-red-ink text-ink"
              : "border-slate text-slate"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="tag block text-slate" htmlFor={name}>
        {label} {required && <span className="text-red-ink">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2.5 w-full border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-red-ink"
      />
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  const { t } = useI18n();
  return (
    <button
      type="submit"
      disabled={pending}
      className="tag group mt-8 flex w-full items-center justify-between gap-3 rounded-cta bg-red-ink px-7 py-4 text-white transition-colors hover:bg-red-deep disabled:opacity-60"
    >
      {pending ? t.contact.sending : t.contact.send}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </button>
  );
}
