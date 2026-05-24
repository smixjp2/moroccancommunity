import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leçon | The Moroccan Community',
};

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
