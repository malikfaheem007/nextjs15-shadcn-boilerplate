import { BlogHeaderLayout } from "@/components/content/blog-header-layout";
import Container from "@/components/shared/Container";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogHeaderLayout />
      <Container className="pb-16">{children}</Container>
    </>
  );
}
