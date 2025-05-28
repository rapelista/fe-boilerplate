import { createContext, useContext } from 'react';

import { ParamsType, ParamValueType } from '~/types/core/uri';

export interface DataTableContextProps {
  context: string;
  params: ParamsType;
  updateParam: (key: string, value: ParamValueType) => void;
}

export const DataTableContext = createContext<DataTableContextProps | null>(
  null,
);

export function useDataTableContext() {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error(
      'useDataTableContext must be used within a DataTableProvider',
    );
  }

  return context;
}
