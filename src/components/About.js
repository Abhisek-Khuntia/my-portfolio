import React,{useEffect,useState} from 'react'
import sanityClient from "../client"
import imageUrlBuilder from "@sanity/image-url";
import scenic from "../scenic.jpg"
import BlockContent from "@sanity/block-content-to-react";


// https://www.sanity.io/plugins/image-url
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}


export default function About(){
    const[author,setAuthor] = useState(null);

    useEffect(() => {
        sanityClient
          .fetch(
            `*[_type == "author"]{
              name,
              "bio": bio[0].children[0].text,
              "authorImage": image.asset->url
          }`
          )
          .then((data) => setAuthor(data[0]))
          .catch(console.error);
      }, []);
    
      if (!author) return <div>Loading...</div>;

      return (
        <main className="relative">
          <img src={scenic} alt="scenic morning" className="absolute w-full" />
          <div className="p-10 lg:pt-48 container mx-auto relative">
            <section className="bg-blue-900 rounded-lg shadow-2xl lg:flex p-20 br-10 ">
              <img
                src={urlFor(author.authorImage).url()}
                className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8"
                alt="Abhisek"
              />
              <div className="text-lg flex flex-col justify-center">
                <h1 className="cursive text-6xl text-blue-100 mb-4">
                  Hey there. I'm{" "}
                  <span className="text-blue-100">{author.name}</span>
                </h1>
                <div className="prose lg:prose-xl text-white">
                <p className="text-blue-200 text-lg">{author.bio}</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      );
    }