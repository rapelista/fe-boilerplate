import {
  Button,
  ButtonGroup,
  Divider,
  Group,
  MantineProvider,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import Link from 'next/link';
import { TbChevronDown } from 'react-icons/tb';

import { ActionType } from '~/types/core/table';
import {
  extractParamsFromPath,
  replaceParamsInPath,
} from '~/utils/core/parser';

export interface DataTableActionsProps<T> {
  actions?: ActionType[];
  row: T;
}

export function DataTableActions<T>({
  actions,
  row,
}: DataTableActionsProps<T>) {
  const renderActions = (action: ActionType, key: number | string) => {
    if (action.type === 'modal') {
      const { type: _t, label, modal, modalProps, ...props } = action;

      return (
        <Button
          key={key}
          onClick={() => {
            modals.openContextModal({
              modal,
              innerProps: { row },
              ...modalProps,
            });
          }}
          {...props}
        >
          {label}
        </Button>
      );
    }

    if (action.type === 'link') {
      const { type: _t, label, href, ...props } = action;

      const keys = extractParamsFromPath(href.toString());
      const link = replaceParamsInPath(href.toString(), keys, row);

      return (
        <Button key={key} component={Link} href={link} {...props}>
          {label}
        </Button>
      );
    }

    if (action.type === 'composite') {
      const {
        type: _t,
        actions,
        main,
        popoverProps,
        popoverDropdownProps,
        popoverStackProps,
        ...props
      } = action;

      return (
        <ButtonGroup>
          {renderActions({ variant: 'outline', ...main }, `composite-main`)}

          <Popover
            withArrow
            position="bottom-end"
            width={200}
            zIndex={10}
            {...popoverProps}
          >
            <PopoverTarget>
              <Button px="xs" variant="outline" {...props}>
                <TbChevronDown />
              </Button>
            </PopoverTarget>

            <PopoverDropdown p={0} py={4} {...popoverDropdownProps}>
              <Stack gap={4} {...popoverStackProps}>
                {actions.map((action, key) => {
                  if (action.type === 'divider') {
                    const { type: _t, ...props } = action;

                    return (
                      <Divider key={`composite-divider-${key}`} {...props} />
                    );
                  } else {
                    return renderActions(
                      {
                        variant: 'subtle',
                        justify: 'start',
                        radius: 0,
                        ...action,
                      },
                      `composite-menu-${key}`,
                    );
                  }
                })}
              </Stack>
            </PopoverDropdown>
          </Popover>
        </ButtonGroup>
      );
    }

    return null;
  };

  return (
    <MantineProvider
      theme={{
        components: {
          Button: Button.extend({
            defaultProps: {
              size: 'xs',
              variant: 'subtle',
            },
          }),
        },
      }}
    >
      <Group gap="xs">{actions?.map(renderActions)}</Group>
    </MantineProvider>
  );
}
