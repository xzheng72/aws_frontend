import { redirect } from 'next/navigation';

export default function NewProductPage() {
  async function createProduct(formData: FormData) {
    // this is a server action! (the client sends post request to the web server)
    'use server';
    // check the user's inputs
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    console.log('user input:', title, description);

    //redirect to the root route (the web server sends post request to the client)
    redirect('/');
  }

  return (
    <div>
      <form action={createProduct}>
        <h3 className="font-bold m-3">Create new product</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="w-30" htmlFor="title">
              Title
            </label>
            <input
              name="title"
              className="border rounded p-2 w-full"
              id="title"
            />
          </div>

          <div className="flex gap-4">
            <label className="w-30" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              className="border rounded p-2 w-full"
              id="description"
            />
          </div>

          <button type="submit" className="rounded p-2 bg-blue-200">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
