'use client'

import { Ability, Agent } from '@/interfaces/agents'
import { useEffect, useState } from 'react'
import { AgentAbilities } from './AgentAbilities'

interface AgentProps {
  agent: Agent
}
export function AgentShower({ agent }: AgentProps) {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null)

  useEffect(() => {
    setSelectedAbility(agent.abilities[0])

    const audio = document.getElementById(
      'voice-line-audio',
    ) as HTMLAudioElement

    audio.volume = 0.3
    audio.play()
  }, [agent.abilities, agent.voiceLine.mediaList])

  return (
    <div className="relative flex flex-col w-1/3">
      <audio id="voice-line-audio" src={agent.voiceLine.mediaList[0].wave} />

      {/* Details */}
      <div className="absolute w-[1px] h-[100%] bg-zinc-200/50 left-[-5%] bottom-[-7%]"></div>
      <div className="absolute w-[1px] h-[100%] bg-zinc-200/20 left-[-7%] bottom-[-7%]"></div>

      {/* Agente name */}
      <div className="grid grid-rows-3">
        <div>
          <h2 className="font-bebas text-zinc-200 text-xl tracking-[6px] font-light">
            {agent.role.displayName}
          </h2>
          <h1 className="font-bebas text-yellow-100 text-9xl font-black">
            {agent.displayName}
          </h1>
        </div>

        <AgentAbilities
          roleIconUrl={agent.role.displayIcon}
          abilities={agent.abilities}
          selectedAbility={selectedAbility ?? agent.abilities[0]}
          setSelectedAbility={setSelectedAbility}
        />

        {/* Agent description */}
        <p className="font-sans text-yellow-200 font-medium leading-snug w-[80%]">
          {agent.description}
        </p>

        {/* Agent role */}
        <div className="w-[70%]">
          <h2 className="font-sans font-medium text-xl text-zinc-200 uppercase">
            {agent.role.displayName}
          </h2>
          <p className="font-sans font-light text-md text-zinc-200">
            {agent.role.description}
          </p>
        </div>
      </div>
    </div>
  )
}
