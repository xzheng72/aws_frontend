// app/page.js (or app/home/page.js for a specific route)
import React from 'react';
import { BASE_URL } from '@/api/apiUtils';
import ProductList from '@/components/ProductList';
import { Box, Container, CssBaseline, Grid, Typography } from '@mui/joy';
import ProductFormComponent from '@/components/ProductForm';
import { EC2Metadata } from '@/types/types';
import EC2MetadataDisplay from '@/components/EC2MetadataDisplay';

// on the web server, hit the backend API /products
const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`, { cache: 'no-store' }); // Disable caching to ensure fresh data is fetched
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const createNewProduct = async (productData: FormData) => {
  'use server';
  //console.log(productData);
  try {
    const response = await fetch(`${BASE_URL}/product`, {
      method: 'POST',
      body: productData,
      // No need to set 'Content-Type' header; fetch automatically sets it for FormData
    });

    if (response.status !== 201) {
      throw new Error('Failed to create product');
    }
  } catch (error) {
    console.error(error);
  }
};

export default async function Home() {
  //fetch EC2 metadata from the web server
  let instanceId: string = '';
  let az: string = '';
  try {
    const res = await fetch('http://localhost:3000/api/fetch-ec2metadata', {
      method: 'GET',
    });
    if (res.ok) {
      const data = (await res.json()) as EC2Metadata;
      instanceId = data.instanceId;
      az = data.availabilityZone;
    } else {
      instanceId = 'Response is not ok';
      az = 'Response is not ok';
    }
  } catch (err) {
    console.error('Error Fetching Metadata', err);
    instanceId = err as string;
    az = err as string;
  }

  //fetch products and render
  const products = await fetchProducts();
  return (
    <div>
      <Grid container spacing={2}>
        {/* Left Side */}
        <Grid xs={6} marginTop={'20px'}>
          {instanceId && az ? (
            <EC2MetadataDisplay
              frontEnd
              instanceId={instanceId as string}
              availabilityZone={az as string}
            />
          ) : (
            <EC2MetadataDisplay
              frontEnd
              instanceId={'Error Fetching instanceId'}
              availabilityZone={'Error Fetching AZ'}
            />
          )}
          {/* Top Header */}
          <>
            <CssBaseline />
            <Box
              component="header"
              sx={{
                marginTop: '20px',
                backgroundColor: 'primary.500',
                borderRadius: '7px',
                py: 2,
                mb: 4,
                boxShadow: 'sm',
              }}
            >
              <Container maxWidth="lg">
                <Typography
                  level="h4"
                  sx={{ color: 'white', fontWeight: 'bold' }}
                >
                  AnyGroupLLC
                </Typography>
                <Typography level="body-sm" sx={{ color: 'white', mt: 1 }}>
                  Welcome to AnyGroupLLC, your trusted source for fresh and
                  delicious fruits!
                </Typography>
              </Container>
            </Box>
          </>
          {/* Form */}
          <ProductFormComponent createNewProduct={createNewProduct} />
        </Grid>

        {/* Right Side */}
        <Grid xs={6} marginTop={'20px'}>
          <ProductList products={products} />
        </Grid>
      </Grid>
    </div>
  );
}
