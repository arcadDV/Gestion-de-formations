import { readFileSync } from "node:fs"
import { PrismaClient } from "@prisma/client"

function loadEnv() {
  const content = readFileSync(".env", "utf8")
  for (const line of content.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    process.env[key] ??= value
  }
}

loadEnv()

const variants = [
  ["session pooler", process.env.DIRECT_URL],
  ["transaction pooler", process.env.DATABASE_URL],
  [
    "session pooler no-verify",
    process.env.DIRECT_URL?.replace("sslmode=require", "sslmode=no-verify"),
  ],
]

for (const [label, testUrl] of variants) {
  if (!testUrl) continue
  console.log(`\n--- ${label} ---`)
  console.log("Host:", new URL(testUrl.replace(/^postgresql:/, "http:")).host)

  const prisma = new PrismaClient({
    datasources: { db: { url: testUrl } },
  })

  try {
    await prisma.$connect()
    const result = await prisma.$queryRaw`SELECT 1 AS ok`
    console.log("Connection OK:", result)
    await prisma.$disconnect()
    process.exit(0)
  } catch (error) {
    console.error("Failed:", error.message)
    await prisma.$disconnect().catch(() => {})
  }
}

process.exitCode = 1
