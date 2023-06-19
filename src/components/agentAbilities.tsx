import { Ability } from '@/interfaces/agents'
import { motion } from 'framer-motion'
import Image from 'next/image'
import localFont from 'next/font/local'
import { Dispatch, SetStateAction } from 'react'

const valorantFont = localFont({ src: '../../public/fonts/Valorant-Font.ttf' })

interface AgentAbilitiesProps {
  abilities: Ability[]
  selectedAbility: Ability
  setSelectedAbility: Dispatch<SetStateAction<Ability | null>>
}

export default function AgentAbilities({
  abilities,
  selectedAbility,
  setSelectedAbility,
}: AgentAbilitiesProps) {
  const abilityVariants = {
    selected: {
      height: 65,
      opacity: 1,
    },
    notSelected: {
      height: 50,
      opacity: 0.5,
    },
  }

  return (
    <div className="flex flex-col h-full gap-6 p-6 py-10 items-center">
      <h1
        className={`${valorantFont.className} flex gap-2 items-center text-zinc-100 text-6xl font-bold`}
      >
        Habilidades
      </h1>
      <div className="grid grid-cols-4 w-full justify-items-center items-center mb-6">
        {abilities.map((ability, index) => {
          if (ability.slot === 'Passive') return <></>

          return (
            <motion.div
              key={ability.slot}
              animate={
                selectedAbility?.slot === ability.slot
                  ? 'selected'
                  : 'notSelected'
              }
              variants={abilityVariants}
              className="relative aspect-square select-none"
              onClick={() => {
                setSelectedAbility(ability)
              }}
            >
              <Image
                src={ability.displayIcon}
                alt={`Habilidade ${index}`}
                fill={true}
                className="object-contain"
              />
            </motion.div>
          )
        })}
      </div>
      <div className="h-full flex justify-between flex-col items-center">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-zinc-200 font-bold text-lg">
            {selectedAbility?.displayName}
          </h2>
          <p className="text-zinc-200 text-justify leading-relaxed">
            {selectedAbility?.description}
          </p>
        </div>
        {abilities.map((ability) => {
          if (ability.slot !== 'Passive') return <></>

          return (
            <div
              key={ability.slot}
              className={`flex flex-col gap-2 items-center text-zinc-100 text-lg font-bold`}
            >
              Passiva: {ability.displayName}
              <p className="text-zinc-200 text-justify leading-relaxed text-sm font-normal">
                {ability.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
