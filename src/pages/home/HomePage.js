import UserStore from "@/lib/user";
import { Footer, Header, Navigation } from "@/components";
import { EventManager } from "@/util/eventManager";
import storage from "@/util/storage";
import { Post } from "@/components/post";

export function HomePage({ container }) {
  let posts = storage.get("posts") || [];

  const appendPost = (e) => {
    e.preventDefault();
    if (!e.target.matches("#post-form")) return;
    const { content } = e.target.elements;
    const user = UserStore.geUser()?.username || "anonymous";
    const newPosts = [
      ...posts,
      {
        user,
        date: Date.now(),
        content: content.value,
      },
    ];

    storage.set("posts", newPosts);
    posts = newPosts;
  };

  EventManager.addEvent(container, "submit", appendPost);

  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
      ${Header()}
        <div id="nav">
      ${Navigation()}
      </div>
        <main class="p-4">
          <form  id="post-form"  class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea id="content" class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded"><span>게시</span></button>
          </form>
          <div class="space-y-4">
          ${posts.map((post) => Post({ post })).join("")}
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  `;
}
