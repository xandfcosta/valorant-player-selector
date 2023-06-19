'use client'

import { Agent } from '@/interfaces/agents'
import { useEffect, useState } from 'react'
import Selector from './selector'
import AgentShower from './agentShower'

interface AgentsCarrouselProps {
  agents: Agent[]
}

export default function AgentsCarrousel({ agents }: AgentsCarrouselProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [visibleAgents, setVisibleAgents] = useState<Agent[]>(
    getVisibleAgents(selectedIndex),
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getVisibleAgents(index: number) {
    const doubleAgents = [...agents, ...agents]

    let actualIndex = selectedIndex % agents.length

    if (actualIndex - 2 < 0) {
      actualIndex += agents.length
    }

    return doubleAgents.slice(actualIndex - 2, actualIndex + 3)
  }

  useEffect(() => {
    const newVisibleAgents = getVisibleAgents(selectedIndex)
    setVisibleAgents(newVisibleAgents)
  }, [getVisibleAgents, selectedIndex])

  const actualAgent = visibleAgents[2]

  return (
    <>
      <AgentShower agent={actualAgent}></AgentShower>

      <Selector
        agents={visibleAgents}
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      ></Selector>
    </>
  )
}
