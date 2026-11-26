import Image from "next/image";
import {
  BriefcaseBusiness,
  CirclePlay,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { footer, site } from "@/content/site";
import Logo from "@/public/images/brand/evosistencia.png";

const contactIcons = [MapPin, Mail, FileText];

export function Footer() {
  const legalLinks = footer.legal.split(" · ");

  return (
    <footer className="bg-white pt-12 pb-6 text-[#796b91] sm:pt-14">
      <Container>
        <div className="grid gap-9 border-b border-[#eee8f5] pb-8 sm:grid-cols-2 lg:grid-cols-[1.65fr_0.75fr_1.1fr_0.95fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src={Logo}
              alt="Evosistencia"
              width={210}
              height={110}
              className="h-[52px] w-[160px] object-contain object-left"
            />
            <p className="mt-3 max-w-[410px] text-[0.92rem] leading-[1.5]">
              {footer.description}
            </p>
            <div className="mt-4 flex gap-3">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-[#f7f3fc] text-[#7960a3] transition duration-200 hover:-translate-y-1 hover:bg-[#eee6f8]"
              >
                <BriefcaseBusiness className="size-[18px]" strokeWidth={1.7} />
              </span>
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-[#f7f3fc] text-[#7960a3] transition duration-200 hover:-translate-y-1 hover:bg-[#eee6f8]"
              >
                <CirclePlay className="size-[18px]" strokeWidth={1.7} />
              </span>
              <a
                href={`mailto:${site.email}`}
                aria-label="Enviar correo"
                className="grid size-10 place-items-center rounded-full bg-[#f7f3fc] text-[#7960a3] transition-colors hover:bg-[#eee6f8]"
              >
                <Mail className="size-[18px]" strokeWidth={1.7} />
              </a>
            </div>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[0.98rem] font-semibold text-[#25212b]">
                {column.title}
              </h3>
              <ul className="mt-2.5 grid gap-2 text-[0.9rem]">
                {column.links.map((link, index) => {
                  const Icon =
                    column.title === "Contacto" ? contactIcons[index] : null;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-3 transition-colors hover:text-[#5b22e8]"
                      >
                        {Icon ? (
                          <Icon
                            aria-hidden="true"
                            className="size-[17px] shrink-0 text-[#7960a3]"
                            strokeWidth={1.7}
                          />
                        ) : null}
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-3 pt-5 text-[0.82rem] text-[#85749c] sm:flex-row sm:items-center">
          <span>{footer.copyright}</span>
          <div className="flex flex-wrap gap-3">
            {legalLinks.map((label, index) => (
              <span key={label} className="inline-flex items-center gap-3">
                {index > 0 ? <span aria-hidden="true">·</span> : null}
                <span>{label}</span>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
