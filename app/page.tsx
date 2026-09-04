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
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf5] via-[#fff5e6] to-[#f5e6d3] dark:from-[#1a1410] dark:via-[#2d2416] dark:to-[#3d2817] py-12 px-4">
      <div className="max-w-sm mx-auto">
        <div className="space-y-8">
          {/* 프로필 섹션 */}
          <div className="text-center">
            {/* 프로필 사진 */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={profile.profileImage}
                  alt="프로필"
                  className="w-32 h-32 rounded-full object-cover shadow-xl dark:shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* 이름 */}
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2 tracking-tight">
              {profile.name}
            </h1>

            {/* 한 줄 소개 */}
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-sm leading-relaxed max-w-xs mx-auto">
              {profile.bio}
            </p>
          </div>

          {/* 링크 카드 */}
          <div className="space-y-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center justify-center w-full py-3 px-4 text-gray-900 dark:text-white font-medium rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                <span className="mr-2 text-lg group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
