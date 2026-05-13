import { Wrapper } from "./widget.styles";

type widgetProps = {
  label: string;
  children: React.ReactNode;
};
const Widget: React.FC<widgetProps> = ({ label, children }) => {
  return (
    <Wrapper>
      <p>{label}: </p>
      <b className={label.toLowerCase()}>{children}</b>
    </Wrapper>
  );
};
export default Widget;
