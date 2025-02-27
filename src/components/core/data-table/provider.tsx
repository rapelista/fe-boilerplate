import { PropsWithChildren, useState } from 'react';
import { ParamsType, ParamValueType } from '~/types/core/uri';
import { defaultParams } from '~/utils/core/data-table';
import { DataTableContext } from './context';

export interface DataTableProviderProps extends PropsWithChildren {
  context: string;
  params?: ParamsType;
}

export function DataTableProvider({
  children,
  context,
  params: initialParams,
}: DataTableProviderProps) {
  const [params, setParams] = useState({ ...defaultParams, ...initialParams });

  const updateParam = (key: string, value: ParamValueType) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DataTableContext.Provider
      value={{
        context,
        params,
        updateParam,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}
