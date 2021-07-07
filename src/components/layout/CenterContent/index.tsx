import React from 'react';
import Logo from 'components/common/Logo';

export interface CenterContentProps {
  children?: React.ReactNode;
}

const CenterContent: React.FC<CenterContentProps> = ({
  children,
}: CenterContentProps): JSX.Element => {
  return (
    <section className="section--login">
      <div style={{ textAlign: 'center' }}>
        <Logo size="4rem" color="var(--theme-color)" />
      </div>

      <div style={{ flex: '0 1 100%' }}>{children}</div>
    </section>
  );
};

export default CenterContent;
