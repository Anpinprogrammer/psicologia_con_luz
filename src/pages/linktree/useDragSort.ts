import { useState, useRef } from 'react'

/**
 * useDragSort
 * Custom hook that handles drag-and-drop reordering of a list.
 *
 * Usage:
 *   const { dragHandlers, draggingId, overTargetId } = useDragSort(items, setItems)
 *
 *   <div {...dragHandlers(item.id)}>...</div>
 */


export function useDragSort<T extends { id: number }>(
  items:    T[],
  setItems: (items: T[]) => void
) {
  const dragSrcId  = useRef<number | null>(null)
  const [draggingId,    setDraggingId]    = useState<number | null>(null)
  const [overTargetId,  setOverTargetId]  = useState<number | null>(null)

  const dragHandlers = (id: number) => ({
    draggable: true as const,

    onDragStart: (e: React.DragEvent) => {
      dragSrcId.current = id
      setDraggingId(id)
      e.dataTransfer.effectAllowed = 'move'
    },

    onDragEnd: () => {
      dragSrcId.current = null
      setDraggingId(null)
      setOverTargetId(null)
    },

    onDragOver: (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      if (dragSrcId.current !== id) setOverTargetId(id)
    },

    onDragLeave: () => setOverTargetId(null),

    onDrop: (e: React.DragEvent) => {
      e.preventDefault()
      setOverTargetId(null)
      const srcId = dragSrcId.current
      if (srcId === null || srcId === id) return

      const srcIdx = items.findIndex(x => x.id === srcId)
      const dstIdx = items.findIndex(x => x.id === id)
      const next   = [...items]
      const [moved] = next.splice(srcIdx, 1)
      next.splice(dstIdx, 0, moved)
      setItems(next)
      dragSrcId.current = null
      setDraggingId(null)
    },
  })

  return { dragHandlers, draggingId, overTargetId }
}
