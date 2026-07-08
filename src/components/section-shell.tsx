import { type ReactNode } from "react"
import { useZoomScene } from "@/components/zoom-scene"
import { motion } from "motion/react"

interface SectionShellProps {
  index: number
  id?: string
  children: ReactNode
  className?: string
}

/** @deprecated Use ZoomSection directly — kept for section file compatibility */
export function SectionShell({ index, id, children, className = "" }: SectionShellProps) {
  const { activeIndex } = useZoomScene()
  const isActive = activeIndex === index

  return (
    <div id={id} className={className}>
      <motion.div
        className="relative z-10 mx-auto w-full min-w-0 max-w-3xl text-center"
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  index?: number
  sectionIndex: number
}

export function StaggerItem({ children, index = 0, sectionIndex }: StaggerItemProps) {
  const { activeIndex } = useZoomScene()
  const isActive = activeIndex === sectionIndex

  return (
    <motion.div
      className="w-full min-w-0"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
      }}
      transition={{
        duration: 0.75,
        delay: isActive ? index * 0.06 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
