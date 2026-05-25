import { Header } from "@/components/Header";
import { PortoBackdrop } from "@/components/PortoBackdrop";
import { COMPANY_NAME } from "@/lib/site-brand";
import type { Metadata } from "next";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  title: `Contact — ${COMPANY_NAME}`,
  description: `Get in touch with ${COMPANY_NAME} about your project.`,
};

export default function ContactPage() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-black text-foreground">
      <PortoBackdrop />
      <div className="relative z-10">
        <Header />
        <ContactView />
      </div>
    </div>
  );
}
