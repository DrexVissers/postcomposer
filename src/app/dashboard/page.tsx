import MainLayout from "@/components/layout/MainLayout";
import { mockPosts } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { Edit, Trash, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Posts</h1>
          <Link
            href="/create"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Create New Post
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium text-gray-600">
            <div className="col-span-5">Content</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-3">Platforms</div>
            <div className="col-span-2">Actions</div>
          </div>

          {mockPosts.map((post) => {
            const createdDate = new Date(post.createdAt);
            const timeAgo = formatDistanceToNow(createdDate, {
              addSuffix: true,
            });

            return (
              <div
                key={post.id}
                className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50"
              >
                <div className="col-span-5">
                  <p className="text-gray-800 line-clamp-2">{post.content}</p>
                </div>
                <div className="col-span-2 text-gray-600 text-sm self-center">
                  {timeAgo}
                </div>
                <div className="col-span-3 self-center">
                  <div className="flex space-x-2">
                    {post.platforms.linkedin && (
                      <div
                        className={`px-2 py-1 text-xs rounded-full ${
                          post.platforms.linkedin.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.platforms.linkedin.published
                          ? "LinkedIn"
                          : "LinkedIn (Draft)"}
                      </div>
                    )}
                    {post.platforms.twitter && (
                      <div
                        className={`px-2 py-1 text-xs rounded-full ${
                          post.platforms.twitter.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.platforms.twitter.published
                          ? "Twitter"
                          : "Twitter (Draft)"}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-2 self-center">
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-teal-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-red-600 transition-colors">
                      <Trash className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
