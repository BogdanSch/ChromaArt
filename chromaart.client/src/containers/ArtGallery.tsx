import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button, Card } from "react-bootstrap";
import { API_URL } from "../variables";
import type { PostDto } from "../types";
import { LazyImage } from "../components";

export default function ArtGallery() {
  const [requestError, setRequestError] = useState<string | null>(null);
  const fetchInstagramPosts = async (): Promise<PostDto[]> => {
    try {
      setRequestError(null);
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["instagramPosts"],
    queryFn: fetchInstagramPosts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Alert variant={"danger"} show={requestError !== null || error !== null}>
        {requestError || error?.message}
      </Alert>
      <div className="gallery__grid">
        {data && data.length > 0 ? (
          data.map((post) => {
            return (
              <article className="gallery__item" key={post.id}>
                <Card className="gallery__card">
                  <LazyImage
                    src={`${API_URL}/instagram-posts/proxy-image?url=${encodeURIComponent(post.displayUrl)}`}
                    alt={post.alt}
                    containerClassName="card-img"
                  />
                  <Card.ImgOverlay>
                    <div className="gallery__overlay">
                      <p className="gallery__caption">
                        {post.caption.getPreview()}
                      </p>
                      {post.mentions.length > 0 && (
                        <p className="gallery__mentions">
                          {post.mentions.map((mention, index) => (
                            <span key={index}>@{mention}</span>
                          ))}
                        </p>
                      )}
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </article>
            );
          })
        ) : (
          <p>Sorry, no posts available.</p>
        )}
      </div>
      <div className="gallery__actions mt-4">
        <Button
          href="https://instagram.com/itsnotenderart"
          target="_blank"
          variant="primary"
        >
          View more on Instagram
        </Button>
      </div>
    </>
  );
}
