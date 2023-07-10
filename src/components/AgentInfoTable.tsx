'use client'

import { Ability, Role } from '@/interfaces/agents'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface AgentInfoTableProps {
  isMobile: boolean
  agentId: string
  role: Role
  abilities: Ability[]
  selectedItem: Ability | Role
  setSelectedItem: (info: Ability | Role) => void
}

export function AgentInfoTable({
  isMobile,
  agentId,
  role,
  abilities,
  selectedItem,
  setSelectedItem,
}: AgentInfoTableProps) {
  const headers = ['c', 'q', 'e', 'x']
  abilities = abilities.filter((ability) => {
    return ability.slot !== 'Passive'
  })
  abilities = abilities.map((ability, index) => {
    ability.key = headers[index]

    return ability
  })
  role.key = isMobile ? '!' : 'info'
  const infos = [role, ...abilities]

  return (
    <div className="relative grid grid-cols-5 w-full h-[100px] justify-items-center items-center rounded-md gap-1">
      <div className="absolute top-[39%] w-full md:w-[107%] left-0 md:left-[-7%] h-[1px] bg-zinc-200"></div>

      {infos.map((info, index) => {
        const headerStyle = {
          backgroundColor:
            info === selectedItem ? 'rgb(228 228 231 / 0.5)' : 'transparent',
          color: info === selectedItem ? 'rgb(24 24 27)' : 'rgb(228 228 231)',
        }
        const selectedStyle = {
          backgroundColor:
            info === selectedItem
              ? 'rgb(228 228 231 / 0.2)'
              : 'rgb(113 113 122 / 0.2)',
        }

        return (
          <motion.div
            key={index}
            initial={{ backgroundColor: 'rgb(0 0 0 / 0)' }}
            animate={selectedStyle}
            className="relative flex flex-col gap-2 items-center h-full w-full select-none p-2 cursor-pointer"
            // style={selectedStyle}
            onClick={() => setSelectedItem(info)}
          >
            <div className="absolute top-[38%] left-[50%] translate-x-[-50%] w-2 h-[3px] bg-zinc-200"></div>
            <motion.h2
              key={index}
              initial={{ backgroundColor: 'rgb(0 0 0 / 0)' }}
              animate={headerStyle}
              className="mx-2 w-full px-2 text-center text-lg font-sans uppercase"
            >
              {info.key}
            </motion.h2>
            <motion.div
              key={`icon-${agentId}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, ease: 'easeOut' }}
              className="relative h-full w-full select-none"
            >
              <Image
                src={info.displayIcon}
                alt={`Habilidade ${index}`}
                fill
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 25vw"
                priority
                className="object-contain"
                style={{ opacity: 0.5 }}
              />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
