'use client'

import { Ability } from '@/interfaces/agents'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface AgentAbilitiesProps {
  agentId: string
  roleId: string
  roleIconUrl: string
  abilities: Ability[]
  selectedAbility: Ability
  setSelectedAbility: Dispatch<SetStateAction<Ability | null>>
}

export function AgentAbilities({
  agentId,
  roleId,
  roleIconUrl,
  abilities,
  selectedAbility,
  setSelectedAbility,
}: AgentAbilitiesProps) {
  const keys = ['c', 'q', 'e', 'x']
  abilities = abilities.filter((ability) => {
    return ability.slot !== 'Passive'
  })
  abilities = abilities.map((ability, index) => {
    ability.key = keys[index]

    return ability
  })

  return (
    <div className="flex flex-col  justify-center items-center">
      <div className="grid grid-cols-5 w-full h-[100px] justify-items-center items-center rounded-md gap-1">
        <div className="relative flex flex-col gap-2 items-center h-full w-full select-none bg-zinc-500/20 p-2">
          {/* Detail */}
          <div className="absolute top-[38%] left-[50%] translate-x-[-50%] w-2 h-[3px] bg-zinc-200"></div>

          {/* Role */}
          <h2 className="mx-2 w-full bg-zinc-200/50 px-2 text-center text-lg text-zinc-700 font-sans uppercase">
            Info
          </h2>
          <motion.div
            key={`icon-${roleId}-role`}
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3, ease: 'easeInOut' }}
          >
            <Image
              src={roleIconUrl}
              alt="Agent Role"
              fill
              sizes="25%"
              priority
              className="object-contain"
              style={{ opacity: 0.5 }}
            />
          </motion.div>
        </div>

        {/* Abilities */}
        {abilities.map((ability, index) => {
          return (
            <div
              key={ability.slot}
              className="relative flex flex-col gap-2 items-center h-full w-full select-none bg-zinc-500/20 p-2"
            >
              <div className="absolute top-[38%] left-[50%] translate-x-[-50%] w-2 h-[3px] bg-zinc-200"></div>
              <h2 className="mx-2 w-full px-2 text-center text-lg text-zinc-200 font-sans uppercase">
                {ability.key}
              </h2>
              <motion.div
                key={`icon-${agentId}-${ability.slot}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.3, ease: 'easeInOut' }}
                className="relative h-full w-full select-none"
              >
                <Image
                  src={ability.displayIcon}
                  alt={`Habilidade ${index}`}
                  fill
                  sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 25vw"
                  priority
                  className="object-contain"
                  style={{ opacity: 0.5 }}
                />
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
