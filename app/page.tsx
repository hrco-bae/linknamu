"use client";

import { useEffect, useState } from "react";

interface Link {
  _id: string;
  id?: number;
  title: string;
  url: string;
  icon: string;
  clicks: number;
}

export default function Home() {
  const profile = {
    name: "김개발",
    bio: "풀스택 개발자 :즘에는 AI 개발에 관심이 많아요",
    profileImage: "https://placehold.co/150x150/orange/white",
  };

  const defaultLinks: Link[] = [
    {
      _id: "1",
      id: 1,
      title: "GitHub",
      url: "https://github.com",
      icon: "👨‍💻",
      clicks: 0,
    },
    {
      _id: "2",
      id: 2,
      title: "LinkedIn",
      url: "https://linkedin.com",
      icon: "💼",
      clicks: 0,
    },
    {
      _id: "3",
      id: 3,
      title: "Blog",
      url: "https://blog.example.com",
      icon: "📝",
      clicks: 0,
    },
  ];

  const [links, setLinks] = useState<Link[]>([]);
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/links");
      const data = await response.json();

      if (data.length > 0) {
        setLinks(data);
        const counts: Record<string, number> = {};
        data.forEach((link: Link) => {
          counts[link._id] = link.clicks;
        });
        setClickCounts(counts);
      } else {
        // 데이터가 없으면 초기화
        await initializeLinks();
      }
    } catch (error) {
      console.error("Failed to fetch links:", error);
      setLinks(defaultLinks);
    } finally {
      setLoading(false);
    }
  };

  const initializeLinks = async () => {
    try {
      const initResponse = await fetch("/api/links/init", { method: "POST" });
      if (initResponse.ok) {
        // 초기화 후 다시 로드
        const response = await fetch("/api/links");
        const data = await response.json();
        setLinks(data);
        const counts: Record<string, number> = {};
        data.forEach((link: Link) => {
          counts[link._id] = link.clicks;
        });
        setClickCounts(counts);
      }
    } catch (error) {
      console.error("Failed to initialize links:", error);
      setLinks(defaultLinks);
    }
  };

  const handleLinkClick = async (linkId: string) => {
    try {
      await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: linkId }),
      });

      setClickCounts((prev) => ({
        ...prev,
        [linkId]: (prev[linkId] || 0) + 1,
      }));
    } catch (error) {
      console.error("Failed to update click count:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf5] via-[#fff5e6] to-[#f5e6d3] dark:from-[#1a1410] dark:via-[#2d2416] dark:to-[#3d2817] py-12 px-4 sm:px-6">
      <div className="max-w-sm mx-auto">
        <div className="space-y-12">
          {/* 프로필 섹션 */}
          <div className="text-center px-2">
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
          <div className="space-y-4 px-2">
            {links.map((link) => (
              <a
                key={link._id || link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link._id || String(link.id))}
                className="glass flex items-center justify-between w-full py-3 px-4 text-gray-900 dark:text-white font-medium rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                <div className="flex items-center">
                  <span className="mr-2 text-lg group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  {link.title}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {loading ? "0회" : `${clickCounts[link._id || String(link.id)] || 0}회`}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
