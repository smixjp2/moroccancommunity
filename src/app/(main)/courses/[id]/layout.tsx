import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cours | The Moroccan Community',
};

export default function CourseDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
