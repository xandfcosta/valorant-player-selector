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
    <div className="flex flex-col justify-center items-center h-[80%] w-1/3 pr-12">
      <audio id="voice-line-audio" src={agent.voiceLine.mediaList[0].wave} />
      {/* Basic info */}
      <div className="flex flex-col gap-4">
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

        {/* <Image
          src={agent.role.displayIcon}
          alt="Agent Role"
          width={30}
          height={30}
          color="#f4f4f5"
          className="object-contain"
          priority
        /> */}

        <p className="font-sans text-yellow-200 font-bold leading-snug">
          {agent.description}
        </p>

        <div>
          <h2 className="font-opensans font-medium text-2xl text-zinc-200">
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
