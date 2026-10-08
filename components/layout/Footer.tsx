import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { footer } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy pt-[58px] pb-7 text-white/70">
      <Container>
        <div className="grid gap-[34px] md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Image
              src="/images/brand/evosistencia.png"
              alt="Evosistencia"
              width={210}
              height={62}
              className="mb-3.5 h-[62px] w-[210px] object-contain object-left"
            />
            <p className="max-w-[420px] text-[0.95rem]">
              {footer.description}
            </p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-bold tracking-normal text-white">
                {column.title}
              </h3>
              <ul className="mt-3.5 grid gap-[9px] text-[0.95rem]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-[34px] flex flex-wrap justify-between gap-5 border-t border-white/15 pt-[22px] text-[0.85rem] text-white/50">
          <span>{footer.copyright}</span>
          <span>{footer.legal}</span>
        </div>
      </Container>
    </footer>
  );
}
