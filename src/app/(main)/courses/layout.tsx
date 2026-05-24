import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cours | The Moroccan Community',
  description: 'Formez-vous aux investissements avec nos cours vidéo',
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
