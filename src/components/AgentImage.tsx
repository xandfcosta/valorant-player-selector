import { Agent } from '@/interfaces/agents'
import Image from 'next/image'
import { motion, cubicBezier } from 'framer-motion'

interface AgentImageProps {
  agent: Agent
  originDirection: boolean // true = left | false = right
}
export function AgentImage({ agent, originDirection }: AgentImageProps) {
  const initialState = originDirection
    ? {
        // left
        opacity: 0,
        x: '-200px',
      }
    : {
        // right
        opacity: 0,
        x: '200px',
      }
  const finalState = { opacity: 1, x: '0px' }
  const exitState = { opacity: 0 }
  const transition = {
    ease: cubicBezier(0.25, 0.75, 0.5, 1.25),
    delay: 0.2,
    duration: 0.15,
  }
  const { backgroundGradientColors: colors } = agent

  return (
    <div className="absolute top-[30%] right-[-100%] w-[300%] h-full md:top-0 md:left-0 md:w-full md:h-full z-0 overflow-hidden">
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            key={`${agent.uuid}-agent`}
            initial={initialState}
            animate={finalState}
            exit={exitState}
            transition={{ ...transition }}
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
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            key={`${agent.uuid}-agent`}
            initial={initialState}
            animate={finalState}
            exit={exitState}
            transition={{ ...transition, delay: transition.delay + 0.1 }}
            className="relative w-full h-full overflow-hidden"
            style={{ zIndex: 0 }}
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
                filter: `contrast(0) opacity(.4) drop-shadow(0 0 #${colors[0]})`,
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
