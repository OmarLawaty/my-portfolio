import { redirect } from 'next/navigation';

import { RepoFields } from '@/const';
import { Field } from '@/apis';

interface LayoutProps {
  params: Promise<{ FIELD: string }>;
  children: React.ReactNode;
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { FIELD } = await params;

  if (!RepoFields.includes(FIELD as Field)) return redirect('/projects');

  return children;
};

export default Layout;
