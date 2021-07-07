import React, { ReactNode } from 'react';
import Linkify from 'react-linkify';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

export interface LinkifyWrapperProps {
  children: ReactNode;
}

const LinkifyWrapper: React.FC<LinkifyWrapperProps> = ({
  children,
}: LinkifyWrapperProps): JSX.Element => {
  const componentDecorator = (href: string, text: string, key: number) => {
    if (href.charAt(0) === '/') {
      return (
        <a href={href} key={key} className="tag">
          {text}
        </a>
      );
    }
    return (
      <a
        href={href}
        key={key}
        className="tag"
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  };

  const linkify = new LinkifyIt();
  linkify.tlds(tlds).add('@', {
    validate: function (text, pos, self) {
      const tail = text.slice(pos);

      if (!self.re.username) {
        self.re.username = new RegExp(
          '^([a-zA-Z0-9_-]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')',
        );
      }
      if (self.re.username.test(tail)) {
        // Linkifier allows punctuation chars before prefix,
        // but we additionally disable `@` ("@@mention" is invalid)
        if (pos >= 2 && tail[pos - 2] === '@') {
          return false;
        }
        const matched = tail.match(self.re.username);
        if (matched !== null) {
          return matched[0].length;
        }
        return 0;
      }
      return 0;
    },
    normalize: function (match) {
      match.url = '/' + match.url.replace(/^@/, '');
    },
  });

  const matchDecorator = (text: string) => {
    return linkify.match(text);
  };

  return (
    <Linkify
      componentDecorator={componentDecorator}
      matchDecorator={matchDecorator}
    >
      {children}
    </Linkify>
  );
};

export default React.memo(LinkifyWrapper);
