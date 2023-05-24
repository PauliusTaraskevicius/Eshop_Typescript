import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import Layout from "@/components/Layout";
import LoginModal from "@/components/Modals/LoginModal";
import RegisterModal from "@/components/Modals/RegisterModal";
import CategoryModal from "@/components/Modals/CategoryModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <CategoryModal />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
