import { PageTransitionWrapper } from '@/components';
import { pages } from '@/routes';

interface TemplateProps {
  children: React.ReactNode;
}

const Template = ({ children }: TemplateProps) => (
  <PageTransitionWrapper pages={pages}>{children}</PageTransitionWrapper>
);

export default Template;
