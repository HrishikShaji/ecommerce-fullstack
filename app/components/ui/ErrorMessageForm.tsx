interface ErrorMessageFormProps {
  value: string;
}

export const ErrorMessageForm: React.FC<ErrorMessageFormProps> = (props) => {
  return (
    <>
      {props.value !== "" ? (
        <h1 className="text-red-500">{props.value}</h1>
      ) : null}
    </>
  );
};
