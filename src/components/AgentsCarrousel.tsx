'use client'

// fix

import { Agent } from '@/interfaces/agents'
import { useEffect, useState } from 'react'
import { AgentShower } from './AgentShower'
import { Selector } from './Selector'
import { AgentBackground } from './AgentBackground'
import { AgentImage } from './AgentImage'

interface AgentsCarrouselProps {
  agents: Agent[]
}

export default function AgentsCarrousel({ agents }: AgentsCarrouselProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [visibleAgents, setVisibleAgents] = useState<Agent[]>(
    getVisibleAgents(selectedIndex),
  )
  const [selectedAgent, setSelectedAgent] = useState<Agent>(
    visibleAgents[Math.floor(visibleAgents.length / 2)],
  )

  function getVisibleAgents(index: number) {
    const doubleAgents = [...agents, ...agents]

    let actualIndex = index % agents.length

    if (actualIndex - 6 < 0) {
      actualIndex += agents.length
    }
    if (actualIndex + 7 > doubleAgents.length) {
      actualIndex -= agents.length
    }

    return doubleAgents.slice(actualIndex - 6, actualIndex + 7)
  }

  useEffect(() => {
    const agents = getVisibleAgents(selectedIndex)
    const selectedAgent = agents[Math.floor(visibleAgents.length / 2)]

    setSelectedAgent(selectedAgent)
    setVisibleAgents(agents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex])

  return (
    <div className="realtive flex flex-col justify-center w-full h-full">
      <AgentBackground
        url={selectedAgent.background}
        colors={selectedAgent.backgroundGradientColors}
      />
      <AgentImage agent={selectedAgent} />
      <div className="flex-1 z-10 flex justify-end">
        <AgentShower agent={selectedAgent}></AgentShower>
      </div>

      <Selector
        agents={visibleAgents}
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      ></Selector>
    </div>
  )
}
