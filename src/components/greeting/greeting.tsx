import { CustomButton } from "..";
import { Wrapper } from "./greeting.styles";

type GreetingProps = {
  setHasVisited: React.Dispatch<React.SetStateAction<boolean>>;
};

const Greeting: React.FC<GreetingProps> = ({ setHasVisited }) => {
  return (
    <Wrapper>
      <h3>
        Welcome to <span>Typing Speed Game</span>
      </h3>
      <h4> Customize the typing game to your preferences</h4>
      <CustomButton btnType="blue" handleButton={() => setHasVisited(true)} />
    </Wrapper>
  );
};
export default Greeting;
