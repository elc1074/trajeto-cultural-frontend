export function Header({section}) {
  return (
    <div className="overflow-hidden">
      <header className="w-full relative bg-purple-500 py-3">
        <img
          className="w-[130px] absolute -top-4 left-0"
          src="/header-1.png"
          alt=""
        />
        <img
          className="w-[100px] absolute -top-4 -right-4"
          src="/header-2.png"
          alt=""
        />
        <h1 className="text-white text-center text-2xl font-bold py-2">
          {section}
        </h1>
      </header>
    </div>
  );
}
