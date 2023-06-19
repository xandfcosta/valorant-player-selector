import axios from 'axios'

import { Agent } from '../interfaces/agents'
import AgentsCarrousel from '@/components/agentsCarrousel'

export default async function Home() {
  const res = await axios.get('https://valorant-api.com/v1/agents', {
    params: {
      language: 'pt-BR',
      isPlayableCharacter: 'true',
    },
  })

  if (!res) {
    return <div>Erro na API</div>
  }

  const agents: Agent[] = res.data.data

  return (
    <div className="flex flex-col justify-center w-full bg-zinc-900 h-full">
      <AgentsCarrousel agents={agents}></AgentsCarrousel>
    </div>
  )
}
