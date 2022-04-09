import { z } from 'zod'

export const GetRecentlyPlayedGamesResponse = z.object({
  response: z.object({
    total_count: z.number(),
    games: z.array(
      z.object({
        appid: z.number(),
        name: z.string(),
        playtime_2weeks: z.number(),
        playtime_forever: z.number(),
        img_icon_url: z.string(),
        playtime_windows_forever: z.number(),
        playtime_mac_forever: z.number(),
        playtime_linux_forever: z.number(),
      }),
    ),
  }),
})

export type GetRecentlyPlayedGamesResponse = z.infer<typeof GetRecentlyPlayedGamesResponse>
