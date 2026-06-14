import type { ComponentType, PropsWithChildren } from "react";
import { Overlay } from "./withBluerOverlay.styles";

export const withBlueOverlay = <P extends object>(
  Component: ComponentType<P>,
) => {
  const WrappedComponent = (props: PropsWithChildren<P>) => (
    <Overlay>
      <Component {...(props as P)} />
    </Overlay>
  );

  WrappedComponent.displayName = `withBlueOverlay(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
