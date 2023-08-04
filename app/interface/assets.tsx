export interface Assets {
  assets: Asset[];
}

export interface Asset {
  id: number;
  token_id: string;
  image_url: string;
  name: string;
  description: string;
  asset_contract: {
    address: string;
  };
  permalink: string;
  collection: {
    name: string;
  };
}
