'use client'

import { Agent } from '@/interfaces/agents'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface SelectorProps {
  agents: Agent[]
  setSelectedIndex: Dispatch<SetStateAction<number>>
  selectedIndex: number
}

export function Selector({
  agents,
  setSelectedIndex,
  selectedIndex,
}: SelectorProps) {
  return (
    <div className="flex flex-col items-center z-10">
      <div className="relative w-[95%] h-[1px]">
        <div className="absolute top-0 left-0 h-full w-[5px] bg-zinc-200"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-zinc-200 opacity-50"></div>
        <div className="absolute top-0 right-0 h-full w-[5px] bg-zinc-200"></div>
      </div>
      <div className="flex justify-center select-none p-6">
        <motion.div initial={{ opacity: 0.5 }} whileHover={{ opacity: 1 }}>
          <ChevronLeft
            onClick={() => {
              setSelectedIndex(selectedIndex - 1)
            }}
            size={100}
            color="#efefef"
          ></ChevronLeft>
        </motion.div>

        <div className="flex gap-2 items-end">
          {agents?.map((agent, index) => {
            const opacity =
              index !== Math.floor(agents.length / 2) ? '30%' : '100%'

            return (
              <motion.div
                key={agent.uuid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative border-2 border-green-200 bg-green-900/30"
                style={{
                  opacity,
                  boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, .5)',
                }}
              >
                <div className="absolute top-1 left-1 bg-green-200 rounded-full w-[3px] h-[3px]"></div>
                <div className="absolute top-1 right-1 bg-green-200 rounded-full w-[3px] h-[3px]"></div>
                <div className="absolute bottom-1 left-1 bg-green-200 rounded-full w-[3px] h-[3px]"></div>
                <div className="absolute bottom-1 right-1 bg-green-200 rounded-full w-[3px] h-[3px]"></div>
                <Image
                  src={agent.displayIcon}
                  alt={`${agent.displayName} Icon`}
                  width={100}
                  height={100}
                  priority
                  style={{ opacity }}
                />
              </motion.div>
            )
          })}
        </div>
        <motion.div initial={{ opacity: 0.5 }} whileHover={{ opacity: 1 }}>
          <ChevronRight
            className="opacity-50 hover:opacity-100"
            onClick={() => setSelectedIndex(selectedIndex + 1)}
            size={100}
            color="#efefef"
          ></ChevronRight>
        </motion.div>
      </div>
    </div>
  )
}
