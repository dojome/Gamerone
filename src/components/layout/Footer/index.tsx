import React, { ReactNode } from 'react';
import Legal from 'containers/Legal';
import './style.scss';
import Icon from 'components/common/Icon';
import Badge from 'components/common/Badge';
import Tooltip from 'components/common/Tooltip';
import CallToActionCard from 'containers/Cards/CallToActionCard';

export interface Props {
  children?: ReactNode;
}

const Footer: React.FC<Props> = ({ children }: Props): JSX.Element => {
  return (
    <footer className="footer">
      <section className="wrapper">
        <CallToActionCard
          title="Found a bug? Feature request?"
          description="Visit G1.gg on Discord"
          buttonText="Discord"
          buttonIconLeft="icon-video-games-discord"
          to="https://discord.gg/scNCQUg"
        />

        <div className="social-networks-wrapper">
          <div className="badges">
            <Tooltip text="Join us on Discord" position="top">
              <a
                href="https://discord.gg/scNCQUg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge type="flat" testid="footer-badge">
                  <Icon name="icon-video-games-discord" size="125x"></Icon>
                </Badge>
              </a>
            </Tooltip>
            <Tooltip text="Follow us on Twitter" position="top">
              <a
                href="https://twitter.com/WeAreGamerOne"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge type="flat" testid="footer-badge">
                  <Icon name="icon-social-media-twitter" size="125x"></Icon>
                </Badge>
              </a>
            </Tooltip>
            <Tooltip text="Follow us on Instagram" position="top">
              <a
                href="https://www.instagram.com/WeAreGamerOne"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge type="flat" testid="footer-badge">
                  <Icon name="icon-social-instagram" size="125x"></Icon>
                </Badge>
              </a>
            </Tooltip>
            <Tooltip text="Jobs and internships with us?" position="top">
              <a
                href="https://www.linkedin.com/company/gamerone"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge type="flat" testid="footer-badge">
                  <Icon
                    name="icon-professional-network-linkedin"
                    size="125x"
                  ></Icon>
                </Badge>
              </a>
            </Tooltip>
          </div>
        </div>
        <Legal />
        {children}
      </section>
    </footer>
  );
};

export default Footer;
