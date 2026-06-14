"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { EVENT_HASHTAG, HONOREE_FAMILY_NAME } from "@/lib/constants";
import { displayHonoreeName } from "@/lib/format-name";

const faqs = [
  {
    q: "When is the RSVP deadline?",
    a: "We kindly ask that all RSVPs be submitted as soon as possible, and no later than two weeks before the event (August 8, 2026). This allows us to finalize seating, catering, and celebration details for our guests.",
  },
  {
    q: "Can I bring a guest?",
    a: "Attendance is by invitation. If your invitation includes a plus-one, please indicate this when submitting your RSVP and provide your guest's full name and contact details. Additional guests not indicated on your invitation cannot be accommodated.",
  },
  {
    q: "What is the dress code?",
    a: "The celebration calls for elegant and refined attire. Think cocktail or formal evening wear — navy, gold, ivory, and warm cream tones are warmly encouraged to match the spirit of this milestone.",
  },
  {
    q: "Where is the celebration being held?",
    a: "The event will take place at Wayne Tree Manor, located at 35100 Van Born Rd, Wayne, MI 48184. The celebration runs from 7:00 PM until 1:00 AM on Saturday, August 22nd, 2026.",
  },
  {
    q: "Is hotel accommodation available?",
    a: "Yes. A reserved room block has been arranged through Marriott for out-of-town guests. Scroll to the Hotel Accommodations section above and use the Reserve Your Room link to book at the special group rate.",
  },
  {
    q: "What time should I arrive?",
    a: "We recommend arriving between 6:30 PM and 7:00 PM to allow time for a warm welcome before the formal celebration begins at 7:00 PM.",
  },
  {
    q: "Is parking available at the venue?",
    a: "Yes, complimentary parking is available on-site at Wayne Tree Manor. Valet or additional parking details will be confirmed closer to the event date.",
  },
  {
    q: "Can I update my RSVP after submitting?",
    a: "Absolutely. If your plans change, please reach out to the family directly so we can update your response. We want an accurate headcount to make this evening perfect for everyone.",
  },
  {
    q: "What hashtag should I use when sharing?",
    a: `When posting photos, memories, or well-wishes on social media, please use ${EVENT_HASHTAG}. We would love to see the celebration through your eyes!`,
  },
  {
    q: "Who do I contact with questions?",
    a: `For any questions regarding the celebration, RSVP, or accommodations, please contact the ${displayHonoreeName(HONOREE_FAMILY_NAME)} Family directly. We are happy to assist and look forward to celebrating with you.`,
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-16 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label">Questions &amp; Answers</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-cream">
            Frequently Asked Questions
          </h2>
          <p className="text-cream/50 mt-3 font-[family-name:var(--font-cormorant)] italic text-lg">
            Everything you need to know before the celebration.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`rounded-xl border transition-colors overflow-hidden ${
                  isOpen
                    ? "border-gold/35 bg-gold/5"
                    : "border-gold/10 glass hover:border-gold/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <HelpCircle
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isOpen ? "text-gold" : "text-gold/40"
                    }`}
                  />
                  <span className="flex-1 text-cream font-[family-name:var(--font-cormorant)] text-lg leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gold/60 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pl-[3.75rem]">
                        <p className="text-cream/65 font-[family-name:var(--font-cormorant)] text-base leading-[1.85]">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Hashtag callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center glass-gold rounded-2xl p-8 border border-gold/25"
        >
          <p className="section-label mb-3">Share the Celebration</p>
          <p className="hashtag-bold text-2xl sm:text-3xl md:text-4xl mt-1">
            {EVENT_HASHTAG}
          </p>
          <p className="text-cream/50 mt-3 font-[family-name:var(--font-cormorant)] text-base max-w-md mx-auto">
            Tag your photos, memories, and well-wishes — let&apos;s fill the feed
            with golden moments from this milestone evening.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
