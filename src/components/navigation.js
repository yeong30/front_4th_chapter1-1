import UserStore from "@/lib/user";

const navList = {
  private: [
    {
      path: "/profile",
      title: "프로필",
      id: "profile",
    },
    {
      path: "/login",
      title: "로그아웃",
      id: "logout",
    },
  ],
  public: [
    {
      path: "/login",
      title: "로그인",
      id: "login",
    },
  ],
};
const getClassName = (path) => {
  const currentPath = window.location.hash
    ? window.location.hash.slice(1)
    : window.location.pathname;
  return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};

export function Navigation() {
  const renderedNavs = UserStore.checkLogin()
    ? navList.private
    : navList.public;

  return `<nav id="navigation" class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${getClassName("/")}">홈</a></li>
      ${renderedNavs
        .map(
          ({ id, path, title }) =>
            `<li key=${id}><a id=${id} href="${path}" class="${getClassName(path)}">${title}</a></li>`,
        )
        .join("")}
    </ul>
  </nav>`;
}
