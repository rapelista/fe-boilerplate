import {
  LoadingOverlay,
  LoadingOverlayProps,
  TableCaption,
} from '@mantine/core';

export interface DataTableOverlayProps extends LoadingOverlayProps {}

export function DataTableOverlay(props: DataTableOverlayProps) {
  return (
    <TableCaption pos="absolute" w="100%" h="100%" style={{ zIndex: 10 }}>
      <LoadingOverlay visible={true} {...props} />
    </TableCaption>
  );
}
