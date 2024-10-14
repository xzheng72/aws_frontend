// this is a client component
'use client';
import React, { useState } from 'react';
import { Box, Textarea, Button, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';

interface Props {
  createNewProduct: (productData: FormData) => Promise<void>;
}

// comment
const ProductForm = (props: Props) => {
  const router = useRouter();
  // State to hold the input values
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');
  // The image to upload
  const [image, setImage] = useState<File | null>(null);
  // Display error
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log(files);
      setImage(files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input
    if (!title || !user || !description || !image) {
      setError('All fields are required.');
      return;
    }

    const productData = new FormData();
    productData.append('title', title);
    productData.append('user', user);
    productData.append('description', description);
    productData.append('image', image);
    // this executes on the web server
    props.createNewProduct(productData);

    // Reset the form after submission
    setTitle('');
    setUser('');
    setDescription('');
    setError('');
    setImage(null);

    router.refresh();
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.level1',
        p: 3,
        borderRadius: '8px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)', // Add stronger shadow with more spread
      }}
    >
      <Typography level="h2" sx={{ mb: 2 }}>
        Add a Product
      </Typography>
      <form onSubmit={handleSubmit}>
        {error && (
          <Typography sx={{ color: 'error.main', mb: 2 }}>{error}</Typography>
        )}
        <Textarea
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minRows={1}
          sx={{ mb: 2 }}
        />
        <Textarea
          placeholder="Seller"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          minRows={1}
          sx={{ mb: 2 }}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={3}
          sx={{ mb: 2 }}
        />
        {/* Image field */}
        <Box
          sx={{
            bgcolor: 'background.level1',
            borderRadius: '8px',
            boxShadow: 2,
            marginTop: '2px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between', // One item on the left, one on the right
            alignItems: 'center', // Optional, aligns items vertically
          }}
        >
          {image && (
            <Box
              component="img"
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              sx={{
                width: 200,
                height: 200,
                objectFit: 'cover',
                borderRadius: 'md',
                boxShadow: 'lg',
              }}
            />
          )}
          <Button variant="outlined" component="label">
            {image ? 'Change' : 'Upload an Image (<1MB)'}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>

        <Button type="submit" variant="solid">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
