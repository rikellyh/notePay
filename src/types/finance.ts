export interface Finance {
  id?: string;
  description: string;
  value: string;
  typeValue: string;
}

export type GetFinances = Finance[];
