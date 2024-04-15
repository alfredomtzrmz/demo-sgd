export type APIResponse<T> = {
  status: string;
  statusText: number;
  data: APIDataResponse<T>;
};

export type APIDataResponse<T> = {
  links: Links;
  meta: Meta;
  message: string;
  data: T;
};

export interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}
