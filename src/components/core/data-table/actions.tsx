import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { ActionType } from '~/types/core/table';

export interface DataTableActionsProps<T> {
  actions?: ActionType[];
  row: T;
}

export function DataTableActions<T>({
  actions,
  row: _row,
}: DataTableActionsProps<T>) {
  return (
    <Group>
      {actions?.map((action, key) => {
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
      })}
    </Group>
  );
}
