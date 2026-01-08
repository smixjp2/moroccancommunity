
import { FirebaseClientProvider } from "@/firebase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
        </div>
    </FirebaseClientProvider>
  );
}
