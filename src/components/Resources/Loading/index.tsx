interface Props {
  active: boolean;
}

export default function Loading({ active }: Props) {
  return (
    <div
      className={`fixed w-full bg-slate-300 opacity-50 top-0 left-0 h-full z-50 flex-col justify-center items-center ${
        active ? "" : "hidden"
      }`}
    >
      <span className="loader"></span>
    </div>
  );
}
