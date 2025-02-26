import {
  Table,
  TableProps,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';

const data = [
  {
    name: 'John Doe',
    age: 25,
  },
  {
    name: 'Jane Doe',
    age: 22,
  },
];

export function DataTable(props: TableProps) {
  return (
    <Table {...props}>
      <TableThead>
        <TableTr>
          <TableTh>Name</TableTh>
          <TableTh>Age</TableTh>
        </TableTr>
      </TableThead>

      <TableTbody>
        {data.map((row, key) => (
          <TableTr key={key}>
            <TableTd>{row.name}</TableTd>
            <TableTd>{row.age}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}
