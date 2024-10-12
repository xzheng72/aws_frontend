import { ProductsEntity, ProductItem } from '@/types/types';
import { Box, Typography, ListItem, Grid } from '@mui/joy';
import React from 'react';
import EC2MetadataDisplay from './EC2MetadataDisplay';

interface Props {
  products: ProductsEntity;
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <Box ml={'10px'}>
      {/* Show EC2 Metadata */}
      {products.ec2Metadata.instanceId &&
        products.ec2Metadata.availabilityZone && (
          <EC2MetadataDisplay
            instanceId={products.ec2Metadata.instanceId}
            availabilityZone={products.ec2Metadata.availabilityZone}
          />
        )}

      {/* products */}
      <Grid container justifyContent={'space-between'} marginTop={'145px'}>
        {products.products.map((product: ProductItem) => (
          <ListItem
            key={product.id}
            sx={{
              width: '200px', // Make each item take half the width (minus some gap)
              aspectRatio: '1.4', // Maintain a 1:1 aspect ratio (height equals width)

              position: 'relative', // Enable positioning for layered content
              backgroundColor: 'rgba(18, 18, 18, 0.4)', // Add transparency to the background
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%), url(${product.imageURI})`, // Add linear gradient on top of image
              backgroundSize: 'cover', // Cover the entire area
              backgroundPosition: 'center', // Center the image
              backgroundRepeat: 'no-repeat', // Prevent the image from repeating
              color: 'white', // Set text color to white
              borderRadius: '8px',
              p: 2,
              boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)', // Add stronger shadow with more spread
              display: 'flex', // Ensure layout is vertical
              flexDirection: 'column', // Stack items vertically
              justifyContent: 'flex-end', // Ensure the content is pushed to the bottom
              alignItems: 'flex-start', // Align the text to the left
              marginBottom: '30px',
            }}
          >
            <Box sx={{ mt: 'auto' }}>
              {' '}
              {/* This Box will ensure Typography sticks to the bottom-left */}
              <Typography level="h4" textColor={'white'}>
                {product.title}
              </Typography>
              <Typography level="body-sm" textColor={'white'}>
                Seller: {product.user}
              </Typography>
              <Typography level="body-sm" textColor={'white'}>
                Description: {product.description}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
