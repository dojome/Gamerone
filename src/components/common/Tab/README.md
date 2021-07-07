## Note

### Components

`Tab`, `TabPane` and `TabNav`

**Tab** - A container for tab panes in modal style

- show: boolean - indicates the visible status of tab
- onClose: function - an event callback that is fired when the tab is closing
- tabWidth: number - tab width in pixel. if tabWdith is not specificed, it takes 60% of the viewport width

**TabPane** - A container that wraps an actual component

- key: string | number - key value for the component
- title: string - a label which shows on the tab menu and indicates the actual tab
  **_key and title props must be available_**

**TabNav** - A menu on the tab (_this is only internally_)

---

### How it works

**Tab** looks for **TabPane**s among its children, and then grabs **title** and **key** props from each **TabPane**. With those titles, it builds a tab menu - **TabNav**. So you need to pass the title into every TabPane and they appears on the menu

### Example

```
export default function UserSettingsTab({
  visible = false,
  onClose,
}: UserSettingsTabProps) {
  return (
    <Tab show={visible} onClose={onClose}>
      <TabPane key="avatar" title="Avatar">
        <AvatarSettings />
      </TabPane>
      <TabPane key="cover" title="Cover">
        <CoverSettings />
      </TabPane>
      <TabPane key="profile" title="Profile">
        <ProfileSettings />
      </TabPane>
    </Tab>
  );
}

```
