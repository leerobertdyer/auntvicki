
export default function Footer() {
  return (
    <div
      className="
    flex 
    h-[120px]
    w-screen 
    flex-col 
    items-center 
    justify-center
    border-t-2 
    border-rose-800 
     bg-gradient-to-b
     from-purple-200
     to-rose-200"
    >
      <p className="xl text-center">Check out our full band</p>
      <a
        href="https://www.auntvicki.rocks"
        target="_blank"
        className="ml-2 inline text-4xl text-rose-800"
      >
        <img
          src={"/wifeisland/photos/bird.png"}
          alt=""
          className="inline"
        />
        Aunt Vicki
        <img
          src={"/wifeisland/photos/bird.png"}
          alt=""
          className="inline"
        />
      </a>
      <p className="text-sm">
        Website by
        <a
          className="
        ml-1 
        text-blue-600 
        hover:text-orange-600"
          href="https://www.leedyer.com"
          target="_blank"
        >
          Lee Dyer
        </a>
      </p>
    </div>
  );
}
