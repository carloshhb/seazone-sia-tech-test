export interface KnownData {
  city: string | null;
  area: number | null;
  suggested_price: number | null;
}

export interface MissingDataResult {
  action: string;
  siaDecision: string;
  missingFields: string;
  knownData: KnownData;
}

export interface MissingDataFieldsResponse {
  new_info: string;
  knownData: KnownData;
}

export interface IncompleteCardProps {
  siaDecision: string;
  missingFields: string;
  knownData: KnownData;
  onComplete: (data: MissingDataFieldsResponse) => void;
  onReset: () => void;
}
