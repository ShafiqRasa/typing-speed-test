import { Wrapper } from "./widget.styles";

type widgetProps = {
  label: string;
  children: React.ReactNode;
};
const Widget: React.FC<widgetProps> = ({ label, children }) => {
  return (
    <Wrapper>
      {label}:<b className={label.toLowerCase()}>{children}</b>
    </Wrapper>
  );
};
export default Widget;
