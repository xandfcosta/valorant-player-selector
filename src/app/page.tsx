import { Agent } from '../interfaces/agents'
import AgentsCarrousel from '../components/AgentsCarrousel'

async function getValorantAgentsData() {
  const res = await fetch(
    'https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true',
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getValorantAgentsData()

  if (!data) {
    return <div>Erro no request da API</div>
  }

  const agents: Agent[] = data.data

  return (
    <div className="w-full h-full bg-zinc-900 overflow-hidden">
      <AgentsCarrousel agents={agents}></AgentsCarrousel>
    </div>
  )
}
