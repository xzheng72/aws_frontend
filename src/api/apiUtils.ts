export const BASE_URL =
  'http://internal-lb-apptier-1864394322.us-east-1.elb.amazonaws.com:3001';

// Utility function to enforce a timeout
export const timeout = (ms: number) => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), ms)
  );
};
