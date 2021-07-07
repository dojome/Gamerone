/**
 * Copy text to clipboard
 * @param value text to copy
 */
export default function copyToClipboard(value: string) {
  const textArea = document.createElement('textarea');
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('Copy');
  textArea.remove();
}
