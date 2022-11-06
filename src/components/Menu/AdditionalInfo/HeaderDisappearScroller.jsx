import React,{ useRef } from "react";
import { motion, useScroll } from "framer-motion";

function HeaderDisappearScroller({RestaruantName,addressrestaruant}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "start start"]
  });

  const { scrollYProgress: name } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  return (
    <section>
      <div ref={ref}>
      <motion.h1 className='restaruant-name'
        style={{opacity: scrollYProgress}}
        >{RestaruantName} | {addressrestaruant}</motion.h1>
        <motion.div
        className="restaruant-navbar-name"
        style={{opacity: name}}>
          <h1>
          {RestaruantName} 
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
export default HeaderDisappearScroller