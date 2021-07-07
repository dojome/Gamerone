import { ValidationRules } from 'react-hook-form';

export type ImageRenderParam = {
  src: string;
};
export type ImageRender = (p: ImageRenderParam) => React.ReactNode;

export interface FormImageProps {
  name: string;
  src: string;
  defaultSrc?: string;
  testid: string;
  showEditButton?: boolean;
  showRemoveButton?: boolean;
  withinInputWrapper?: boolean;
  showHint?: boolean;
  needEdit?: boolean;
  validationRules?: ValidationRules;
  editInfo?: {
    width: number;
    height: number;
    borderRadius: number;
  };
  hint?: string;
  children: ImageRender;
}
