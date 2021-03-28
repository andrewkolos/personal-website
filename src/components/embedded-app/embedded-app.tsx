
export interface EmbeddedAppProps {
  urlName: string;
}

export const EmbeddedApp: React.FC<EmbeddedAppProps> = (props) => {
  return (
    <iframe src={`demos/${props.urlName}`} />
  )
}