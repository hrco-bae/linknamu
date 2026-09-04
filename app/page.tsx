export default function Home() {
  const profile = {
    name: "김개발",
    bio: "풀스택 개발자 :즘에는 AI 개발에 관심이 많아요",
    profileImage: "https://placehold.co/150x150/orange/white",
  };

  const links = [
    {
      id: 1,
      title: "GitHub",
      url: "https://github.com",
      icon: "👨‍💻",
    },
    {
      id: 2,
      title: "LinkedIn",
      url: "https://linkedin.com",
      icon: "💼",
    },
    {
      id: 3,
      title: "Blog",
      url: "https://blog.example.com",
      icon: "📝",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-8 px-4">
      <div className="max-w-sm mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* 프로필 사진 */}
          <div className="flex justify-center mb-6">
            <img
              src={profile.profileImage}
              alt="프로필"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 dark:border-blue-700"
            />
          </div>

          {/* 이름 */}
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            {profile.name}
          </h1>

          {/* 한 줄 소개 */}
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            {profile.bio}
          </p>

          {/* 링크 카드 */}
          <div className="space-y-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <span className="mr-2">{link.icon}</span>
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
