export interface ProductItem {
  title: string;
  user: string;
  id: string;
  description: string;
  imageURI: string;
}

export interface EC2Metadata {
  instanceId: string;
  availabilityZone: string;
}

export interface ProductsEntity {
  products: ProductItem[];
  ec2Metadata: EC2Metadata;
}
export interface NewProduct {
  title: string;
  user: string;
  description: string;
}
