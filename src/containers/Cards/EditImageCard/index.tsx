import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import Card from 'components/common/Card';
import Button, { ButtonSchemeEnum } from 'components/common/Button';

export interface Props {
  image: string;
  visible: boolean;
  title: string;
  width: number;
  height: number;
  borderRadius: number;
  onApply: (url: string) => void;
  onCancel: () => void;
}

export interface State {
  scale: number;
}

export default class EditImageCard extends React.Component<Props, State> {
  private editor: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      scale: 1.0,
    };
  }

  handleApplyClick = () => {
    if (this.editor) {
      const canvas = this.editor.getImage().toDataURL();

      fetch(canvas)
        .then((res) => res.blob())
        .then((blob) => window.URL.createObjectURL(blob))
        .then((url) => this.props.onApply(url))
        .catch(() => this.props.onCancel());
    }
    this.props.onCancel();
  };

  setEditorRef = (editor: any) => (this.editor = editor);

  render() {
    const {
      image,
      visible,
      title,
      width = 512,
      height = 512,
      borderRadius = 250,
      onCancel,
    } = this.props;

    const { scale } = this.state;
    if (!visible) return <></>;

    return (
      <Card>
        <div className="card__content">
          <h4>{title}</h4>
          <div className="editimage__editor">
            <AvatarEditor
              ref={this.setEditorRef}
              image={image}
              width={width}
              height={height}
              border={4}
              borderRadius={borderRadius}
              scale={scale}
            />
            <Slider
              min={1}
              max={4}
              step={0.2}
              defaultValue={scale}
              onChange={(e) => this.setState({ scale: e })}
            />
          </div>
        </div>
        <div className="card__actions">
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            onClick={this.handleApplyClick}
          >
            Apply
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </Card>
    );
  }
}
