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

export default function Selector({
  agents,
  setSelectedIndex,
  selectedIndex,
}: SelectorProps) {
  return (
    <div className="flex items-end justify-center select-none p-6">
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
          const size = index === 2 ? 150 : 100

          return (
            <motion.div
              key={agent.uuid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="border border-white bg-zinc-900/50"
            >
              <Image
                src={agent.displayIcon}
                alt={`${agent.displayName} Icon`}
                width={size}
                height={size}
                priority
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
  )
}
