import React from 'react';
import Page from 'components/layout/Page';
import Feed from 'components/layout/Feed';
import PrivacySettings from './PrivacySettings';
import withChrome from 'components/common/Chrome/withChrome';
import ChangePasswordSettings from './ChangePasswordSettings';
import ThemeSelect from './ThemeSelect';

function Settings() {
  return (
    <Page title="Settings">
      <section style={{ minHeight: '8rem' }}></section>
      <Feed>
        <h1 style={{ textAlign: 'center', fontSize: '1.5rem' }}>Settings</h1>

        <PrivacySettings />

        <ThemeSelect />

        <ChangePasswordSettings />
      </Feed>
    </Page>
  );
}

export default withChrome(Settings);
