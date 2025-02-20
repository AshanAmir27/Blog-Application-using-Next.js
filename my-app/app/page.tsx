"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { BiHome, BiEdit } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>; // Show loading state

  // Logout function
  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out user
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 hidden md:block">
        <h1 className="text-2xl font-bold">
          {session?.user?.name ? ` ${session.user.name}` : "Loading..."}
        </h1>

        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
                <BiHome className="text-xl" /> Home
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
                <MdPostAdd className="text-xl" /> Create Post
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
                <BiEdit className="text-xl" /> Manage Posts
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <h1 className="text-2xl font-bold">Welcome {session?.user?.name}</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Blog Posts Section */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Blog Post */}
          {[1, 2, 3, 4, 5, 6].map((post) => (
            <div key={post} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="https://source.unsplash.com/random/400x250?blog"
                alt="Blog Post"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Blog Post Title</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
                <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
