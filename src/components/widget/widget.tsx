import { Wrapper } from "./widget.styles";

type widgetProps = {
  label: string;
  children: React.ReactNode;
};
const Widget: React.FC<widgetProps> = ({ label, children }) => {
  return (
    <Wrapper>
      {label}: <strong className={label.toLowerCase()}>{children}</strong>
    </Wrapper>
  );
};
export default Widget;
