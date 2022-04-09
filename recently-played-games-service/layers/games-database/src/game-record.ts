import { z } from 'zod'

export const GameRecord = z.object({
  name: z.string().nonempty(),
  appId: z.number(),
  lastKnownToBeRecentlyPlayed: z.number(),
  totalPlaytimeMinutes: z.number(),
})

export type GameRecord = z.infer<typeof GameRecord>
