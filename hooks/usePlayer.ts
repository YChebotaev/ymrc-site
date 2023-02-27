import { useQuery, useMutation } from 'react-query'
import axios from "axios"

export const usePlayer = (pincode?: string) => {
  const { data: currentState, refetch } = useQuery<{
    now_playing: 1 | 0 | null,
    curr_volume: number | null
  }>(['current_state', pincode], async () => {
    const { data } = await axios.get(`/api/${pincode}/current_state`)

    return data
  }, {
    refetchInterval: 1300
  })
  const { mutate } = useMutation(['send_command', pincode], async (body) => {
    await axios.post(`/api/${pincode}/send_command`, body)

    return true
  })
  const playbackState: 'playing' | 'paused' = Boolean(currentState?.now_playing) ? 'playing' : 'paused'
  const volume = currentState?.curr_volume ? currentState?.curr_volume : 0

  return {
    playbackState,
    volume,
    async play() {
      await mutate({ method: 'play' } as any)
      await refetch()
    },
    async pause() {
      await mutate({ method: 'pause' } as any)
      await refetch()
    },
    async forward() {
      await mutate({ method: 'forward'} as any)
      await refetch()
    },
    async backward() {
      await mutate({ method: 'backward'} as any)
      await refetch()
    },
    async setVolume(volume: number) {
      await mutate({ method: 'volume', params: [volume]} as any)
      await refetch()
    }
  }
}
