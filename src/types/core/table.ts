import {
  ButtonProps,
  DividerProps,
  ModalProps,
  PopoverDropdownProps,
  PopoverProps,
  StackProps,
} from '@mantine/core';
import { LinkProps } from 'next/link';

/**
 * Base action props.
 */
export interface ActionProps {
  label: string;
  type: string;
}

/**
 * Action button props.
 */

export interface ActionModalProps extends ActionProps, ButtonProps {
  type: 'modal';
  modal: string;
  modalProps?: Omit<ModalProps, 'opened' | 'onClose'>;
}

/**
 * Action link props.
 */
export interface ActionLinkProps
  extends ActionProps,
    ButtonProps,
    Omit<LinkProps, keyof ButtonProps> {
  type: 'link';
}

export interface ActionCompositeDividerProps extends DividerProps {
  type: 'divider';
}

/**
 * Action composite type.
 */
export interface ActionCompositeProps
  extends Omit<ActionProps, 'label'>,
    ButtonProps {
  type: 'composite';
  main: Exclude<ActionType, ActionCompositeProps>;
  actions: (
    | Exclude<ActionType, ActionCompositeProps>
    | ActionCompositeDividerProps
  )[];
  popoverProps?: PopoverProps;
  popoverDropdownProps?: PopoverDropdownProps;
  popoverStackProps?: StackProps;
}

/**
 * Action type.
 */
export type ActionType =
  | ActionModalProps
  | ActionLinkProps
  | ActionCompositeProps;
