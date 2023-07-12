'use client'

import { Ability, Agent, Role } from '@/interfaces/agents'
import { useEffect, useState } from 'react'
import { AgentInfoTable } from './AgentInfoTable'
import { motion } from 'framer-motion'

interface AgentInfoProps {
  agent: Agent
}
export function AgentInfo({ agent }: AgentInfoProps) {
  const [tableSelectedInfo, setTableSelectedInfo] = useState<Ability | Role>(
    agent.role,
  )
  const [showAgentDescription, setShowAgentDescription] =
    useState<boolean>(true)

  function handleInfoSelection(info: Ability | Role) {
    setTableSelectedInfo(info)
    setShowAgentDescription(info === agent.role)
  }

  useEffect(() => {
    setTableSelectedInfo(agent.role)

    const audio = document.getElementById(
      'voice-line-audio',
    ) as HTMLAudioElement

    audio.volume = 0.3
    audio.play()
  }, [agent.abilities, agent.role, agent.voiceLine.mediaList])

  return (
    <div className="flex-1 z-10 flex justify-center md:justify-end items-start my-6 md:my-28">
      <div className="relative grid grid-cols-[120px_1fr] grid-rows-[100px_1fr] gap-2 md:flex md:flex-col h-full w-full md:w-1/3 md:gap-6">
        <audio
          id="voice-line-audio"
          src={agent.voiceLine.mediaList[0].wave}
          preload="auto"
        />

        {/* Details */}
        <div className="absolute w-[1px] h-[100%] bg-zinc-200/50 left-[-5%] bottom-[-7%]"></div>
        <div className="absolute w-[1px] h-[100%] bg-zinc-200/20 left-[-7%] bottom-[-7%]"></div>

        {/* Agent name */}
        <div>
          <h2 className="font-bebas text-zinc-200 text-sm md:text-xl tracking-[6px] font-light">
            {agent.role.displayName}
          </h2>
          <h1 className="font-bebas text-yellow-100 text-4xl md:text-9xl font-black">
            {agent.displayName}
          </h1>
        </div>

        <AgentInfoTable
          agentId={agent.uuid}
          role={agent.role}
          abilities={agent.abilities}
          selectedItem={tableSelectedInfo ?? agent.abilities[0]}
          setSelectedItem={handleInfoSelection}
        />

        {/* Agent description */}
        <motion.div
          key={tableSelectedInfo.displayName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut' }}
          className="flex flex-col flex-1 gap-6 md:w-full col-span-2"
        >
          {showAgentDescription && (
            <p className="font-sans text-yellow-200 font-medium text-sm md:text-base leading-snug w-full md:w-[80%]">
              {agent.description}
            </p>
          )}

          {/* Ability description */}
          <div className="w-full">
            <h2 className="font-sans font-medium md:text-xl text-zinc-200 uppercase">
              {tableSelectedInfo.displayName}
            </h2>
            <p className="font-sans font-medium md:font-light text-sm md:text-base text-zinc-200">
              {tableSelectedInfo.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
