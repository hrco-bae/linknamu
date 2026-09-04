import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    const connection = await connectDB();
    return NextResponse.json({
      status: "success",
      message: "MongoDB connected successfully",
      database: connection.connection.name,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to MongoDB",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
