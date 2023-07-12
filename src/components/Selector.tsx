'use client'

import { Agent } from '@/interfaces/agents'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface SelectorProps {
  agentId: number
  maxAgents: number
  agents: Agent[]
  fromLeft: boolean
  moveSelector: (distance: number) => Agent[]
}

export function Selector({
  agentId,
  maxAgents,
  agents,
  fromLeft,
  moveSelector,
}: SelectorProps) {
  const initialState = { x: fromLeft ? '-100px' : '100px' }
  const finalState = { x: '0px' }

  return (
    <div className="flex flex-col h-full justify-end items-center gap-6 z-10">
      <div className="relative w-full h-[1px]">
        <div className="absolute top-0 left-0 h-full w-[5px] bg-zinc-200"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-zinc-200 opacity-50"></div>
        <div className="absolute top-0 right-0 h-full w-[5px] bg-zinc-200"></div>
      </div>
      <div className="flex flex-col items-center select-none">
        <motion.div
          key={`selector-${agentId}`}
          initial={initialState}
          animate={finalState}
          transition={{ ease: 'easeOut' }}
          className="flex flex-col md:flex-row gap-2"
        >
          {agents?.map((agent, index) => {
            const middle = Math.floor(agents.length / 2)
            const opacity = index !== middle ? '70%' : '100%'

            return (
              <div
                key={agent.uuid}
                onClick={() => moveSelector(index - middle)}
                className="relative border-2 border-green-200 bg-green-900/30 cursor-pointer"
                style={{
                  opacity,
                  boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, .5)',
                }}
              >
                <div
                  className="absolute top-1 left-1 bg-green-200 rounded-full w-[2px] h-[2px] md:w-[3px] md:h-[3px]"
                  style={{ opacity }}
                ></div>
                <div
                  className="absolute top-1 right-1 bg-green-200 rounded-full w-[2px] h-[2px] md:w-[3px] md:h-[3px]"
                  style={{ opacity }}
                ></div>
                <div
                  className="absolute bottom-1 left-1 bg-green-200 rounded-full w-[2px] h-[2px] md:w-[3px] md:h-[3px]"
                  style={{ opacity }}
                ></div>
                <div
                  className="absolute bottom-1 right-1 bg-green-200 rounded-full w-[2px] h-[2px] md:w-[3px] md:h-[3px]"
                  style={{ opacity }}
                ></div>

                {((fromLeft && index === 0) ||
                  (!fromLeft && index === agents.length - 1)) && (
                  <motion.div
                    key={agent.uuid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, ease: 'easeOut', duration: 0.1 }}
                  >
                    <Image
                      src={agent.displayIcon}
                      alt={`${agent.displayName} Icon`}
                      width={100}
                      height={100}
                      priority
                      style={{ opacity }}
                    />
                  </motion.div>
                )}
                {!(
                  (fromLeft && index === 0) ||
                  (!fromLeft && index === agents.length - 1)
                ) && (
                  <div>
                    <Image
                      src={agent.displayIcon}
                      alt={`${agent.displayName} Icon`}
                      width={100}
                      height={100}
                      priority
                      style={{ opacity }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>
        <div className="flex h-full md:flex-row bg-zinc-700/50 hover:bg-zinc-500/50">
          <ChevronLeft
            onClick={() => {
              moveSelector(-1)
            }}
            color="#c1c1c1"
            size={undefined}
            className=" h-full p-2 w-[50px] cursor-pointer"
          ></ChevronLeft>
          <div
            className="flex flex-col md:flex-row justify-center gap-2 items-center w-full select-none cursor-pointer bg-zinc-900/50 hover:bg-zinc-600/50 text-zinc-200 font-sans font-light"
            onClick={() => moveSelector(-agentId + 1)}
          >
            <p>{agentId}</p>
            <p>/</p>
            <p>{maxAgents}</p>
          </div>
          <ChevronRight
            onClick={() => moveSelector(1)}
            color="#c1c1c1"
            size={undefined}
            className="h-full p-2 w-[50px] cursor-pointer"
          ></ChevronRight>
        </div>
      </div>
    </div>
  )
}
