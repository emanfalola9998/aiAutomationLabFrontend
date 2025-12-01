import blogs from '../../data/blogs.json'
import BlogClient from './BlogClient';

type Blog = {
  id: string;
  title: string;
  content: string;
  image: string;
};


export default async function BlogPage({ params }: { params: { id: string } }) {
  // Await params
  const { id } = await params;

  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return <div className="p-10 text-red-500">Blog not found</div>;
  }

  return <BlogClient blog={blog} />;
}
