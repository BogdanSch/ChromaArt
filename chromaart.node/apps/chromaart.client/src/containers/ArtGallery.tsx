import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Card } from "react-bootstrap";
import { LazyImage } from "../components";
import { useSocials } from "@/contexts/SocialsContext";
import { API_URL } from "shared/variables";
import type { PostDto } from "../types";
import "./art-gallery.scss";

const QUERY_KEY: string = "instagramPosts";

export default function ArtGallery() {
  const queryClient = useQueryClient();
  const {
    instagramData,
    isLoading: isSocialLoading,
    error: socialError,
  } = useSocials();

  const fetchInstagramPosts = async (): Promise<PostDto[]> => {
    try {
      const { data } = await axios.get<PostDto[]>(`${API_URL}/instagram-posts`);
      return data;
    } catch (error) {
      let message: string = "Error fetching Instagram posts.";
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        message = error.response.data?.message;
      }

      console.error(message, error);
      throw new Error(message);
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

  if (isLoading || isSocialLoading) {
    return <p>Loading...</p>;
  }
  const errorMessage: string = error?.message || socialError || "";
  return (
    <>
      <Alert variant={"danger"} show={!errorMessage.isNullOrWhitespace()}>
        {errorMessage}
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
        <Button href={instagramData?.url} target="_blank" variant="primary">
          View more on Instagram
        </Button>
      </div>
    </>
  );
}
