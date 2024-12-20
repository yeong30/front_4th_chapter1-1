import { Footer, Header } from "@/components";
import { EventManager } from "@/util/eventManager";
import UserStore from "@/store/user";

export function ProfilePage({ container }) {
  const user = UserStore.geUser();

  const updateProfile = (e) => {
    if (e.target.id !== "profile-form") return;
    e.preventDefault();

    const { email, username, bio } = e.target.elements;
    UserStore.setUser({
      username: username.value,
      email: email.value,
      bio: bio.value,
    });
  };

  EventManager.addEvent(container, "submit", updateProfile);

  return ` <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
      ${Header()}
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form"> 
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="name"
                  class="w-full p-2 border rounded"
                  value="${user.username}"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full p-2 border rounded"
                  value="${user.email}"
                />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded"
                  placeholder='자기소개를 입력해주세요.'
                >${user.bio}</textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
      ${Footer()}
      </div>
    </div>`;
}
