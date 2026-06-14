import { CustomButton } from "..";
import { withBlueOverlay } from "../hoc/withBlueOverlay";
import { Wrapper } from "./greeting.styles";

type GreetingProps = {
  onStart: () => void;
};

const GreetingBase = ({ onStart }: GreetingProps) => {
  return (
    <Wrapper>
      <p className="eyebrow">Welcome to your typing lab</p>
      <h3>
        Ready to race your <span className="accent">typing speed</span>?
      </h3>
      <p className="description">
        Adjust difficulty, choose your mode, and start when you are ready.
      </p>
      <CustomButton btnType="blue" handleButton={onStart} />
    </Wrapper>
  );
};

const Greeting = withBlueOverlay(GreetingBase);

export default Greeting;
