import { Agent } from '@/interfaces/agents'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface AgentImageProps {
  agent: Agent
  fromLeft: boolean
}
export function AgentImage({ agent, fromLeft }: AgentImageProps) {
  const initialState = fromLeft
    ? {
        opacity: 0,
        translateX: '-100px',
      }
    : {
        opacity: 0,
        translateX: '100px',
      }

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            key={`${agent.uuid}-agent`}
            initial={initialState}
            animate={{ opacity: 1, translateX: '0px' }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.2 }}
            className="relative w-full h-full overflow-hidden z-10"
          >
            <Image
              src={agent.fullPortraitV2}
              alt={`${agent.displayName} Portrait`}
              width={2048}
              height={1860}
              priority
              className="absolute top-0 left-[50%] translate-x-[-50%] h-auto w-[70%]"
              style={{
                objectFit: 'contain',
              }}
            />
          </motion.div>
        </div>

        {agent.backgroundGradientColors.map((color, index) => {
          return (
            <div key={color} className="absolute top-0 left-0 w-full h-full">
              <motion.div
                key={`${agent.uuid}-agent`}
                initial={initialState}
                animate={{ opacity: 1, translateX: '0px' }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: 'easeInOut',
                  duration: 0.5,
                  delay: 0.2 + index / 60,
                }}
                className="relative w-full h-full overflow-hidden"
                style={{ zIndex: 8 - index }}
              >
                <Image
                  src={agent.fullPortraitV2}
                  alt={`${agent.displayName} Portrait`}
                  width={2048}
                  height={1860}
                  priority
                  className="absolute top-0 left-[50%] translate-x-[-50%] h-auto w-[70%]"
                  style={{
                    objectFit: 'contain',
                    filter: `contrast(0) opacity(.3) drop-shadow(0 0 #${color})`,
                  }}
                />
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
