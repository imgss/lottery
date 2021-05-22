import { css, keyframes, cx } from "@emotion/css/macro";
import { random } from "../../../utils/getLucky";
import { motion } from "framer-motion";

// from https://codepen.io/lbebber/pen/ypgql
const getKeyframes = function () {
  return Array.from({ length: 20 })
    .map((val, idx) => {
      return `${idx * 5}%{
        clip:rect(${random(100)}px,9999px,${random(100)}px,0);
      }
    `;
    })
    .join("\n");
};
const noiseAnim = keyframes`
  ${getKeyframes()}
`;
const noiseAnim2 = keyframes`
  ${getKeyframes()}
`;

const styles = {
  lucky: css`
    display: flex;
    flex-wrap: wrap;
    padding: 40px;
    gap: 30px;
  `,
  container: css`
    background: rgba(0,0,0,0.65);
    font-family: "Varela", sans-serif;
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  `,
  glitch: css`
    color: white;
    white-space: nowrap;
    font-size: 60px;
    position: relative;
    display: block;
    margin: 0 auto;
    &:after {
      content: attr(data-text);
      position: absolute;
      left: 2px;
      text-shadow: -2px 0 #fa2e53;
      top: 0;
      color: white;
      background: black;
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
      animation: ${noiseAnim} 2s infinite linear alternate-reverse;
    }

    &:before {
      content: attr(data-text);
      position: absolute;
      left: -2px;
      text-shadow: 2px 0 #27dad2;
      top: 0;
      color: white;
      background: black;
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
      animation: ${noiseAnim2} 3s infinite linear alternate-reverse;
    }
  `,
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function Lucky(props) {
  const { lucks = [] } = props;

  return (
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      animate="visible"

    >
      <div>获奖锦鲤</div>
      <div
        className={styles.lucky}
      >
        {lucks.map((name) => (
          <motion.span
            key={name}
            variants={item}
            className={cx(styles.glitch, css`
              &:before{
                animation-delay: ${Math.random()}s;
              }
              &:after{
                animation-delay: ${Math.random()}s;
              }
            `)}
            data-text={name}
          >
            {name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
