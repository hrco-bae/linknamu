import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Link from "@/lib/models/Link";

export async function POST() {
  try {
    await connectDB();

    // 기존 데이터 삭제
    await Link.deleteMany({});

    // 기본 링크 데이터 저장
    const defaultLinks = [
      {
        title: "GitHub",
        url: "https://github.com",
        icon: "👨‍💻",
        clicks: 0,
      },
      {
        title: "LinkedIn",
        url: "https://linkedin.com",
        icon: "💼",
        clicks: 0,
      },
      {
        title: "Blog",
        url: "https://blog.example.com",
        icon: "📝",
        clicks: 0,
      },
    ];

    const result = await Link.insertMany(defaultLinks);
    return NextResponse.json({
      success: true,
      message: "Links initialized successfully",
      count: result.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize links" },
      { status: 500 }
    );
  }
}
