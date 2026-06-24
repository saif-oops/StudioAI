export default function Header() {
  return (
    <header className="
      mb-8
      flex
      items-center
      justify-between
      rounded-2xl
      border
      border-gray-800
      bg-gray-950
      p-6
    ">


      {/* Welcome */}

      <div>

        <h2 className="text-2xl font-bold">
          Welcome back, Creator 👋
        </h2>

        <p className="mt-1 text-gray-400">
          Create better content with AI insights
        </p>

      </div>




      {/* Right Side */}

      <div className="flex items-center gap-4">


        {/* Credits */}

        <div className="
          rounded-xl
          border
          border-gray-800
          bg-black
          px-4
          py-3
        ">

          <p className="text-xs text-gray-400">
            AI Credits
          </p>

          <p className="font-bold">
            120 / 150
          </p>

        </div>





        {/* Profile */}

        <div className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-blue-600
          font-bold
        ">

          SA

        </div>


      </div>


    </header>
  );
}