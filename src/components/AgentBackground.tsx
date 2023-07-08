import Image from 'next/image'
import { motion } from 'framer-motion'

interface AgentBackgroundProps {
  agentId: string
  url: string
  colors: string[]
}
export function AgentBackground({
  agentId,
  url,
  colors,
}: AgentBackgroundProps) {
  const bgGradient = `linear-gradient(to right bottom, #${colors[0]}, rgba(0, 0, 0, 0) 70%),
  linear-gradient(to left bottom, #${colors[1]}, rgba(0, 0, 0, 0) 70%),
  linear-gradient(to left top, #${colors[2]}, rgba(0, 0, 0, 0) 70%),
  linear-gradient(to right top, #${colors[3]}, rgba(0, 0, 0, 0) 70%)`

  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{
        background: bgGradient,
        backgroundBlendMode: 'darken',
        boxShadow: 'inset 0px 0px 1000px 100px rgba(0, 0, 0, .2) ',
      }}
    >
      <motion.div
        key={`background-${agentId}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, ease: 'easeInOut' }}
        className="relative w-full h-full overflow-hidden"
      >
        <Image
          src={url}
          alt={''}
          width={700}
          height={1024}
          priority
          className="absolute opacity-30 top-[-25%] left-[5%] h-[150%] w-auto z-0"
          style={{ objectFit: 'contain' }}
        />
      </motion.div>
    </div>
  )
}
