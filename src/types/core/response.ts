export type ResponseType<T> = {
  data: T;
};

export type PaginatedResponseType<T> = {
  data: T[];
  meta: {
    page: number;
    totalPage: number;
    totalData: number;
  };
};
