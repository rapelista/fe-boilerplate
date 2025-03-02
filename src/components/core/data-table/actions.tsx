import { Button, Group, MantineProvider } from '@mantine/core';
import Link from 'next/link';
import { ActionType } from '~/types/core/table';

export interface DataTableActionsProps<T> {
  actions?: ActionType[];
  row: T;
}

export function DataTableActions<T>({ actions }: DataTableActionsProps<T>) {
  const renderActions = (action: ActionType, key: number) => {
    if (action.type === 'modal') {
      const { type: _t, label, ...props } = action;

      return (
        <Button key={key} {...props}>
          {label}
        </Button>
      );
    }

    if (action.type === 'link') {
      const { type: _t, label, ...props } = action;

      return (
        <Button key={key} component={Link} {...props}>
          {label}
        </Button>
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
            },
          }),
        },
      }}
    >
      <Group>{actions?.map(renderActions)}</Group>
    </MantineProvider>
  );
}
