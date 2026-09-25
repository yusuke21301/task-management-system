import type { Operator } from "@/types/operator";

export async function getOperators(): Promise<Operator[]> {
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/operators`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("担当者の取得に失敗しました。");
  }

  return response.json();
}