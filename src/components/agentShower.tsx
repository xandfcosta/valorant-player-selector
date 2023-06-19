import { Ability, Agent } from '@/interfaces/agents'
import { motion } from 'framer-motion'
import localFont from 'next/font/local'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AgentAbilities from './agentAbilities'

const valorantFont = localFont({ src: '../../public/fonts/Valorant-Font.ttf' })

interface AgentProps {
  agent: Agent
}
export default function AgentShower({ agent }: AgentProps) {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null)

  useEffect(() => {
    setSelectedAbility(agent.abilities[0])

    const agentAudio = new Audio(agent.voiceLine.mediaList[0].wave)

    if (!agentAudio) return

    agentAudio.volume = 0.3
    agentAudio.play()
  }, [agent.abilities, agent.voiceLine.mediaList])

  return (
    <div className="grid grid-cols-3 items-center justify-items-center h-full">
      {/* Basic info */}
      <div className="flex flex-col px-6">
        <div
          className={`${valorantFont.className} flex gap-2 items-center text-zinc-100 text-6xl font-bold`}
        >
          {agent.displayName}
          <Image
            src={agent.role.displayIcon}
            alt="Agent Role"
            width={30}
            height={30}
            color="#f4f4f5"
            className="object-contain"
          />
        </div>
        <h2
          className={`${valorantFont.className} text-zinc-100 text-2xl font-bold`}
        >
          {agent.role.displayName}
        </h2>
        <p className="text-zinc-200 text-justify leading-relaxed">
          {agent.description}
        </p>
      </div>

      {/* Agent Image */}
      <div
        id="agentImage"
        className="relative w-full min-h-[500px] h-[50%] flex justify-center"
      >
        <motion.div
          key={`${agent.uuid}-back`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 w-full min-h-[500px] h-[50%]"
        >
          <Image
            src={agent.background}
            alt={''}
            fill={true}
            priority={true}
            className="absolute top-0 left-0"
          />
        </motion.div>
        <motion.div
          key={`${agent.uuid}-agent`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full min-h-[500px] h-[50%]"
        >
          <Image
            src={agent.fullPortraitV2}
            alt={`${agent.displayName} Portrait`}
            fill={true}
            priority={true}
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Habilidades */}
      <AgentAbilities
        abilities={agent.abilities}
        selectedAbility={selectedAbility ?? agent.abilities[0]}
        setSelectedAbility={setSelectedAbility}
      />
    </div>
  )
}
