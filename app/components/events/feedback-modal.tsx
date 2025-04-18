"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { Star } from "lucide-react"
import type { Event } from "../../types/events"
import { motion, AnimatePresence } from "framer-motion"

interface FeedbackModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [positives, setPositives] = useState("")
  const [negatives, setNegatives] = useState("")
  const [improvements, setImprovements] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Submitting feedback:", { rating, positives, negatives, improvements })
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset and close
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
      setRating(0)
      setPositives("")
      setNegatives("")
      setImprovements("")
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Event Feedback</DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Star Rating */}
              <div className="space-y-2">
                <label htmlFor="overall-rating" className="text-sm font-medium text-blue-200">Overall Rating</label>
                <div id="overall-rating" className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onHoverStart={() => setHoveredRating(star)}
                      onHoverEnd={() => setHoveredRating(0)}
                      whileHover={{ scale: 1.2 }}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-blue-300"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Feedback Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="positives" className="text-sm font-medium text-blue-200">What went well?</label>
                  <Textarea
                    id="positives"
                    value={positives}
                    onChange={(e) => setPositives(e.target.value)}
                    placeholder="Share the positives..."
                    required
                    className="mt-1 bg-blue-800/50 border-blue-700 text-white placeholder:text-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="negatives" className="text-sm font-medium text-blue-200">What could be improved?</label>
                  <Textarea
                    id="negatives"
                    value={negatives}
                    onChange={(e) => setNegatives(e.target.value)}
                    placeholder="Share your concerns..."
                    required
                    className="mt-1 bg-blue-800/50 border-blue-700 text-white placeholder:text-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="improvements" className="text-sm font-medium text-blue-200">Suggestions for improvement (optional)</label>
                  <Textarea
                    id="improvements"
                    value={improvements}
                    onChange={(e) => setImprovements(e.target.value)}
                    placeholder="Your suggestions..."
                    className="mt-1 bg-blue-800/50 border-blue-700 text-white placeholder:text-blue-300"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    ⭐
                  </motion.div>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }} className="text-5xl mb-4">
                🎉
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-blue-200">Your feedback helps us improve future events.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

