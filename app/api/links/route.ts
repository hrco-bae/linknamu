import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Link from "@/lib/models/Link";

export async function GET() {
  try {
    await connectDB();
    const links = await Link.find().sort({ createdAt: 1 });
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    const link = await Link.findByIdAndUpdate(
      data.id,
      { $inc: { clicks: 1 } },
      { new: true }
    );

    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}
