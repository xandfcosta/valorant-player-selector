'use client'

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
  const [fromLeft, setFromLeft] = useState<boolean>(true)
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

  function handleSelectorChange(direction: 1 | -1) {
    setFromLeft(direction < 0)
    setSelectedIndex(selectedIndex + direction)
  }

  useEffect(() => {
    const agents = getVisibleAgents(selectedIndex)
    const selectedAgent = agents[Math.floor(visibleAgents.length / 2)]

    setSelectedAgent(selectedAgent)
    setVisibleAgents(agents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex])

  return (
    <div className="flex flex-col justify-center w-full h-full px-20">
      {/* Absolute */}
      <AgentBackground
        url={selectedAgent.background}
        colors={selectedAgent.backgroundGradientColors}
      />
      <AgentImage fromLeft={fromLeft} agent={selectedAgent} />

      {/* Relative */}
      <div className="flex-1 z-10 flex justify-end items-center">
        <AgentShower agent={selectedAgent}></AgentShower>
      </div>

      <Selector
        agents={visibleAgents}
        handleSelectorChange={handleSelectorChange}
      ></Selector>
    </div>
  )
}
