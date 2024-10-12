// app/page.js (or app/home/page.js for a specific route)
import React from 'react';
import { BASE_URL } from '@/api/apiUtils';
import ProductList from '@/components/ProductList';
import { Box, Container, CssBaseline, Grid, Typography } from '@mui/joy';
import ProductFormComponent from '@/components/ProductForm';
import { EC2Metadata } from '@/types/types';
import EC2MetadataDisplay from '@/components/EC2MetadataDisplay';

// Fetch data from the API
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

// const timeout = (ms: number): Promise<never> =>
//   new Promise((_, reject) =>
//     setTimeout(() => reject(new Error('Request timed out')), ms)
//   );

// // Fetch instance Id
// const fetchInstanceId = async () => {
//   try {
//     const response = await Promise.race([
//       fetch('http://169.254.169.254/latest/meta-data/instance-id', {
//         cache: 'no-store',
//       }),
//       timeout(500),
//     ]);

//     if ((response as Response).ok) {
//       return (response as Response).json();
//     }
//     return null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// // // Fetch instance Id
// const fetchAZ = async ()=> {
//   try {
//     const response = await Promise.race([
//       fetch(
//         'http://169.254.169.254/latest/meta-data/placement/availability-zone',
//         { cache: 'no-store' }
//       ),
//       timeout(500),
//     ]);

//     if ((response as Response).ok) {
//       return (response as Response).json();
//     }
//     return null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

export default async function Home() {
  //fetch metadata
  let instanceId: string = '';
  let az: string = '';
  try {
    const res = await fetch('/api/fetch-ec2metadata');
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
