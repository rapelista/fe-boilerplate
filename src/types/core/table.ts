import { ButtonProps, ModalProps } from '@mantine/core';
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

export interface ActionButtonProps extends ActionProps, ButtonProps {
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

/**
 * Action type.
 */
export type ActionType = ActionButtonProps | ActionLinkProps;
