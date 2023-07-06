'use client'

import { Ability } from '@/interfaces/agents'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface AgentAbilitiesProps {
  roleIconUrl: string
  abilities: Ability[]
  selectedAbility: Ability
  setSelectedAbility: Dispatch<SetStateAction<Ability | null>>
}

export function AgentAbilities({
  roleIconUrl,
  abilities,
  selectedAbility,
  setSelectedAbility,
}: AgentAbilitiesProps) {
  const passive = abilities.filter((ability) => {
    return ability.slot === 'Passive'
  })[0]
  abilities = abilities.filter((ability) => {
    return ability.slot !== 'Passive'
  })

  return (
    <div className="flex flex-col h-full gap-6 items-center">
      <div className="grid grid-cols-5 w-full h-[70px] justify-items-center items-center rounded-md bg-zinc-500/30">
        <div className="relative aspect-square select-none h-full overflow-hidden">
          <Image
            src={roleIconUrl}
            alt="Agent Role"
            fill
            sizes="25%"
            priority
            className="object-contain"
            style={{ opacity: 0.5 }}
          />
        </div>
        {abilities.map((ability, index) => {
          return (
            <motion.div
              key={`icon-${ability.slot}`}
              className="relative aspect-square select-none w-[60%]"
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
          )
        })}
      </div>
      {/* {passive && (
        <div
          key={passive.slot}
          className={`flex flex-col gap-2 items-center text-zinc-100 text-lg font-bold`}
        >
          Passiva: {passive.displayName}
          <p className="text-zinc-200 text-justify leading-relaxed text-sm font-normal">
            {passive.description}
          </p>
        </div>
      )} */}
    </div>
  )
}
