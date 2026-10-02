import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/**
 * RevealOnScroll — Lenis-aware scroll reveal component.
 *
 * Uses Framer Motion's useScroll + useTransform to create a continuous,
 * scroll-position-linked entrance animation. With Lenis providing smooth
 * interpolated scroll values, the animation feels physically connected
 * to the user's gesture rather than snapping on IntersectionObserver fire.
 *
 * Props:
 *  - children    : content to reveal
 *  - delay       : stagger delay in seconds (default 0)
 *  - distance    : how far (in px) the element travels upward on entry (default 40)
 *  - once        : if true, only plays once (default true, keeps perf optimal)
 *  - threshold   : inView trigger threshold 0–1 (default 0.12)
 */
const RevealOnScroll = ({
    children,
    delay = 0,
    distance = 40,
    once = true,
    threshold = 0.12,
}) => {
    const ref = useRef(null);

    // useInView for triggering — stays accurate via Lenis scroll position
    const isInView = useInView(ref, {
        once,
        margin: '0px 0px -60px 0px',
        amount: threshold,
    });

    // Scroll-linked depth parallax (subtle upward drift as section enters viewport)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Maps scroll progress [0→0.25] to translateY [distance→0]
    // The element drifts in from below, driven by actual scroll position
    const y = useTransform(scrollYProgress, [0, 0.25], [distance * 0.5, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ y }}   // scroll-linked subtle drift
            animate={{
                opacity: isInView ? 1 : 0,
                // Fine vertical shift driven by inView trigger (spring physics)
                translateY: isInView ? 0 : distance,
            }}
            transition={{
                opacity: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
                translateY: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
        >
            {children}
        </motion.div>
    );
};

export default RevealOnScroll;
