import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";
import { FirebaseClientProvider } from "@/firebase";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
        <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        </div>
    </FirebaseClientProvider>
  );
}
