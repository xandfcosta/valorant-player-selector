import { Agent } from '@/interfaces/agents'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface AgentImageProps {
  agent: Agent
}
export function AgentImage({ agent }: AgentImageProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <motion.div
        key={`${agent.uuid}-agent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
        className="relative w-full h-full overflow-hidden"
      >
        <Image
          src={agent.fullPortraitV2}
          alt={`${agent.displayName} Portrait`}
          width={2048}
          height={1860}
          priority
          className="absolute top-0 left-[50%] translate-x-[-50%] h-auto w-[70%]"
          style={{ objectFit: 'contain' }}
        />
      </motion.div>
    </div>
  )
}
