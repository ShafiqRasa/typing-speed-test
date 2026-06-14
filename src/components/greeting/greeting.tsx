import { Wrapper } from "./greeting.styles";

type GreetingProps = {
  setHasVisited: React.Dispatch<React.SetStateAction<boolean>>;
};

const Greeting: React.FC<GreetingProps> = ({ setHasVisited }) => {
  return (
    <Wrapper>
      <button type="button" onClick={() => setHasVisited(true)}>
        Start Typing
      </button>
    </Wrapper>
  );
};
export default Greeting;
