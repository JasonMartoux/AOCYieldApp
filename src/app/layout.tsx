import type { Metadata } from "next"
import { Providers } from "@/providers"

export const metadata: Metadata = {
  title: "Yield App - Votre épargne travaille",
  description:
    "Investissez simplement, sans jargon crypto. Votre épargne travaille pour vous.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
