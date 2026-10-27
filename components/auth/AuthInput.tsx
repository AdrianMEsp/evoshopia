interface Props
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function AuthInput(props: Props) {
  return (
    <input
      {...props}
      className="
        w-full
        border
        rounded-lg
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-violet-500
      "
    />
  );
}