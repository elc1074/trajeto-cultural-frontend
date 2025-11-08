export function Header({section}) {
  return (
    <div className="overflow-hidden">
      <header className="relative w-full bg-primary py-3">
        <img
          className="absolute -top-4 left-0 w-[130px]"
          src="/images/header-1.png"
          alt=""
        />
        <img
          className="absolute -right-4 -top-4 w-[100px]"
          src="/images/header-2.png"
          alt=""
        />
        <h1 className="py-2 text-center text-2xl font-bold text-white">
          {section}
        </h1>
      </header>
    </div>
  );
}
