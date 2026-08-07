import axios from "axios";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Card } from "react-bootstrap";
import { API_URL } from "../variables";
import type { PostDto } from "../types";
import { LazyImage } from "../components";

const QUERY_KEY: string = "instagramPosts";

export default function ArtGallery() {
  const queryClient = useQueryClient();
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
  const handleImageLoadingError = (postId: string): void => {
    queryClient.setQueryData<PostDto[]>([QUERY_KEY], (oldData) => {
      return oldData?.filter((post) => post.id !== postId) || [];
    });
  };
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchInstagramPosts,
    retry: 2,
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
                    handleLoadingError={() => handleImageLoadingError(post.id)}
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
