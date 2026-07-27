import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { API_URL } from "../variables";
import type { PostDto } from "../types";
import { useState } from "react";
import { Alert } from "react-bootstrap";

export default function ArtGallery() {
  const [requestError, setRequestError] = useState<string | null>(null);
  const fetchInstagramPosts = async (): Promise<PostDto[]> => {
    try {
      const { data } = await axios.get<PostDto[]>(`${API_URL}/instagram-posts`);
      return data;
    } catch (error) {
      console.error("Error fetching Instagram posts:", error);
      if (axios.isAxiosError(error) && error.response) {
        setRequestError(error.response.data?.message);
      } else {
        setRequestError("Error fetching Instagram posts.");
      }
      return [];
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["instagramPosts"],
    queryFn: fetchInstagramPosts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Alert variant={"danger"} show={isError || requestError !== null}>
        {requestError}
      </Alert>
      <div className="gallery__grid">
        {data && data.length > 0 ? (
          data.map((post) => {
            return (
              <article className="gallery__item" key={post.id}>
                <img
                  src={`${API_URL}/instagram-posts/proxy-image?url=${encodeURIComponent(post.displayUrl)}`}
                  alt={post.alt}
                  className="gallery__image"
                />
                <div className="gallery__overlay">
                  <p className="gallery__caption">{post.caption}</p>
                </div>
              </article>
            );
          })
        ) : (
          <p>Sorry, no posts available.</p>
        )}
        <div className="gallery__actions mt-5">
          <Link
            to="https://instagram.com/itsnotenderart"
            target="_blank"
            className="gallery__link"
          >
            View more on Instagram
          </Link>
        </div>
      </div>
    </>
  );
}
