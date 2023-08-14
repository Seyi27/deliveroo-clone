import  { createClient }  from '@sanity/client'; // import sanityClient from '@sanity/client' if using sanityClient.
import  ImageUrlBuilder  from '@sanity/image-url'

//to connect the database to the frontend
const client= createClient({ //you can use sanityClient in place of createClient but it is deprecated.
    projectId: 'vniltr6l',
    dataset:'production',
    useCdn:true,
    apiVersion:'2021-10-21'
});

// In the database the image is not an image url,
// so we use the image helper to convert it to an image url for the frontend
const builder = ImageUrlBuilder(client); //to pull image url from images in the database
export const urlFor= (source)=>builder.image(source); //an helper function for the imagebuilder

//Run This exception to add exception for localhost 3000 or your localhost(no necessary localhost 3000) CORS policy
//sanity CORS add http://localhost3000

export default client;