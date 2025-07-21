import { PageTransitionWrapper } from '@/components';

interface TemplateProps {
  children: React.ReactNode;
}

const Template = ({ children }: TemplateProps) => <PageTransitionWrapper>{children}</PageTransitionWrapper>;

export default Template;
