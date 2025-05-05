import { BlogPosts } from "@/components/content/blog-posts";
import { constructMetadata, getBlurDataURL } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Blog – SaaS Starter",
  description: "Latest news and updates from Next SaaS Starter.",
});

const allPosts = [{published: true, date: "", image: ""}];

export default async function BlogPage() {
  const posts = await Promise.all(
    allPosts
      .filter((post) => post.published)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(async (post) => ({
        ...post,
        blurDataURL: await getBlurDataURL(post.image),
      }))
  );

  return <BlogPosts posts={posts} />;
}
