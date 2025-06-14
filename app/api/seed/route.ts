import {
  reseedAttachmentsTable,
  reseedPlansTable,
  reseedUsersTable,
  reseedMinioBucket,
} from "@/lib/actions";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await reseedUsersTable();
    await reseedPlansTable();
    await reseedAttachmentsTable();
    await reseedMinioBucket();

    return NextResponse.json({ message: "sucessfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ api: error }, { status: 500 });
  }
};
