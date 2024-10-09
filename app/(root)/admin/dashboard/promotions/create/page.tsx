'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // For navigation
import { createPromotion } from '@/lib/actions/promotion.actions'; // Adjust import as necessary

const CreatePromotion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Use Next.js router for navigation

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isActive', isActive ? 'on' : 'off'); // Set isActive value

    try {
      const result = await createPromotion(formData);

      if (result.success) {
        setTitle(''); // Reset title field after successful promotion creation
        setDescription(''); // Reset description field
        setIsActive(false); // Reset isActive state
        router.push('/admin/dashboard/promotions'); // Redirect to the promotions list
      } else {
        setError('Failed to create the promotion'); // Handle errors here
      }
    } catch (error) {
      setError('An error occurred while creating the promotion');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Create Promotion</h1>
          <Link
            href="/admin/dashboard/promotions"
            className="bg-gray-500 flex justify-center items-center h-fit text-white hover:bg-gray-600 px-4 py-2 rounded-md"
          >
            Back
          </Link>
        </section>
        <h3 className="text-gray-700 mt-4">
          Manage your promotions here. You can create, update, or delete promotions easily.
        </h3>
      </section>

      <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4">
        <div className="mb-6">
          <h1 className="mb-4 font-bold">Title</h1>
          <Input 
            name="title" 
            value={title} // Controlled input
            onChange={(e) => setTitle(e.target.value)} // Update state on change
            placeholder="Eg. Weekly Bonus" 
            required
          />
        </div>
        
        <div className="mb-2">
          <h1 className="mb-4 font-bold">Description</h1>
          <Textarea 
            name="description" 
            value={description} // Controlled input
            onChange={(e) => setDescription(e.target.value)} // Update state on change
            placeholder="Type your description here." 
            required
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              name="isActive" 
              checked={isActive} // Controlled checkbox
              onChange={(e) => setIsActive(e.target.checked)} // Update state on change
              className="mr-2" 
            />
            This promotion is active
          </label>
        </div>

        {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}

        <div className="flex justify-end mt-3">
          <Button 
            className="bg-orange-500 px-4" 
            type="submit" 
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Creating...' : 'Add Promotion'}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreatePromotion;



// "use client"
// // components/CreatePromotion.tsx
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { createPromotion } from '@/lib/actions/promotion.actions'; // Adjust import as necessary

// const CreatePromotion = () => {
//   const [errors, setErrors] = useState<{ title?: string[]; description?: string[] }>({});
  
//   const handleErrors = (errorResponse: any) => {
//     setErrors(errorResponse.errors);
//   };

//   return (
//     <section className="flex flex-col md:w-10/12 lg:w-8/12">
//       <section className="flex flex-col mb-7">
//         <section className="flex justify-between">
//           <h1 className="text-2xl font-extrabold">Promotions</h1>
//           <Link
//             href="/admin/dashboard/promotions"
//             className="bg-gray-500 flex justify-center items-center h-fit text-white hover:bg-gray-600 px-4 py-2 rounded-md"
//           >
//             Back
//           </Link>
//         </section>
//         <h3 className="text-gray-700 mt-4">
//           Manage your promotions here. You can easily create, update, or delete promotions.
//         </h3>
//       </section>

//       <form
//         action={async (formData: FormData) => {
//           const result = await createPromotion(formData);
//           if (result.errors) {
//             handleErrors(result);
//           } else {
//             // Handle success (e.g., redirect or show success message)
//           }
//         }}
//         className="flex flex-col gap-4"
//       >
//         <section className="my-6">
//           <div className="mb-6">
//             <h1 className="mb-4 font-bold">Title</h1>
//             <Input name="title" placeholder="Eg. Weekly Bonus" required />
//           </div>
//           <div className="mb-2">
//             <h1 className="mb-4 font-bold">Description</h1>
//             <Textarea name="description" placeholder="Type your description here." required />
//           </div>
//           <div className="mb-4">
//             <h1 className="mb-4 font-bold">Active</h1>
//             <label className="flex items-center">
//               <input type="checkbox" name="isActive" className="mr-2" />
//               Activate Promotion
//             </label>
//           </div>
//           <div className="flex justify-end mt-3">
//             <Button className="bg-orange-500 px-4" type="submit">
//               Add Promotion
//             </Button>
//           </div>
//         </section>
//         {errors.title && <div className="text-red-600">{errors.title.join(', ')}</div>}
//         {errors.description && <div className="text-red-600">{errors.description.join(', ')}</div>}
//       </form>
//     </section>
//   );
// };

// export default CreatePromotion;

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import Link from 'next/link'
// import React from 'react'

// const CreatePromotion = () => {
//   return (
//     <section className="flex flex-col md:w-10/12 lg:w-8/12">
//         <section className="flex flex-col mb-7">
//             <section className="flex justify-between">
//                 <h1 className="text-2xl font-extrabold">Promotions</h1>
//                 <Link
//                     href="/admin/dashboard/promotions"
//                     className="bg-gray-500 flex justify-center items-center h-fit text-white hover:bg-gray-600 px-4 py-2 rounded-md"
//                 >
//                     Back
//                 </Link>
//             </section>
//             <h3 className="text-gray-700 mt-4">Manage your customer service link here. You can easily set or update the customer service URL to ensure users always have the latest support access.</h3>
//         </section>

//         <section className=" flex flex-col gap-4">
            
//             <section className="my-6">
//                 {/* <PromotionCarousel/> */}
//                 <div className="mb-6">
//                     <h1 className="mb-4  font-bold">Title</h1>
//                     <Input placeholder="Eg. Weekly Bonus" />
//                 </div>
//                 <div className="mb-2">
//                     <h1 className="mb-4  font-bold">Description</h1>
//                     <Textarea placeholder="Type your message here." />
//                 </div>
//                 <div className="flex justify-end mt-3">
//                     <Button className='bg-orange-500 px-4'>Add Promotion</Button>
//                 </div>
//             </section>
//         </section>

//     </section>
//   )
// }

// export default CreatePromotion