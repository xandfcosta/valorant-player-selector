'use client'

import { Agent } from '@/interfaces/agents'
import { useState } from 'react'
import { AgentInfo } from './AgentInfo'
import { Selector } from './Selector'
import { AgentBackground } from './AgentBackground'
import { AgentImage } from './AgentImage'

interface AgentsCarrouselProps {
  agents: Agent[]
}

export default function AgentsCarrousel({ agents }: AgentsCarrouselProps) {
  const [agentIndex, setAgentIndex] = useState<number>(0)
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[agentIndex])
  const [fromLeft, setFromLeft] = useState<boolean>(true)
  const [selectorAgents, setSelectorAgents] = useState<Agent[]>(
    getSelectorAgents(0, 13),
  )

  function getSelectorAgents(initialIndex: number, endIndex: number) {
    let i = initialIndex
    const selectorAgents = []

    while (i !== endIndex) {
      selectorAgents.push(agents[i])
      const indexOutOfRange = i + 1 > agents.length - 1
      i = indexOutOfRange ? 0 : i + 1
    }

    return selectorAgents
  }

  function moveSelector(distance: number) {
    const index = agentIndex + distance + agents.length
    const actualIndex = index % agents.length
    const initialIndex = (index - 6) % agents.length
    const endIndex = (index + 7) % agents.length

    const selectorAgents = getSelectorAgents(initialIndex, endIndex)

    setAgentIndex(actualIndex)
    setSelectedAgent(agents[actualIndex])
    setSelectorAgents(selectorAgents)
    setFromLeft(distance < 0)

    return selectorAgents
  }

  return (
    <div className="flex flex-col justify-center w-full h-full px-4 md:px-20 overflow-hidden">
      {/* Absolute */}
      <AgentBackground agent={selectedAgent} />
      <AgentImage originDirection={fromLeft} agent={selectedAgent} />

      {/* Relative */}
      <AgentInfo agent={selectedAgent} />
      <Selector
        agentId={agentIndex + 1}
        maxAgents={agents.length}
        agents={selectorAgents}
        fromLeft={fromLeft}
        moveSelector={moveSelector}
      />
    </div>
  )
}
