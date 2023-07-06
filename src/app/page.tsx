import axios from 'axios'

import { Agent } from '../interfaces/agents'
import AgentsCarrousel from '@/components/AgentsCarrousel'
import { cache } from 'react'

export default async function Home() {
  const cachedFetchValorantAgents = cache(async () => {
    const res = await axios.get('https://valorant-api.com/v1/agents', {
      params: {
        language: 'pt-BR',
        isPlayableCharacter: 'true',
      },
    })
    return res
  })

  const res = await cachedFetchValorantAgents()

  if (!res.data) {
    return <div>Erro na API</div>
  }

  const agents: Agent[] = res.data.data

  return (
    <div className="w-full h-full bg-zinc-900">
      <AgentsCarrousel agents={agents}></AgentsCarrousel>
    </div>
  )
}
