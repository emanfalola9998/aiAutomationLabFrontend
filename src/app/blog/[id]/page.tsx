import { use } from "react";
import BlogPageClient from "./BlogPageClient";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ✅ required in Next 15

  return <BlogPageClient id={id} />;
}
