type AnalysisResultProps = {
  analysis: {
    score: number;
    strengths: string[];
    improvements: string[];
  };
};


export default function AnalysisResult({
  analysis,
}: AnalysisResultProps) {


  return (

    <div className="mt-10">


      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          AI Analysis Result ✨
        </h2>


        <span className="
          rounded-full 
          bg-blue-600/20 
          px-4 py-2 
          text-sm 
          text-blue-400
        ">
          AI Powered
        </span>

      </div>




      <div className="grid gap-6 md:grid-cols-3">



        {/* Score Card */}

        <div className="
          rounded-3xl
          border border-gray-800
          bg-gray-950
          p-8
          hover:border-blue-500
          transition
        ">


          <p className="text-gray-400">
            CTR Score
          </p>



          <div className="
            mt-6
            flex
            justify-center
          ">


            <div className="
              flex
              h-40
              w-40
              items-center
              justify-center
              rounded-full
              border-[10px]
              border-blue-500
            ">

              <div className="text-center">

                <p className="text-5xl font-bold">
                  {analysis.score}
                </p>

                <p className="text-gray-400">
                  /100
                </p>

              </div>


            </div>


          </div>


        </div>






        {/* Strengths */}

        <div className="
          rounded-3xl
          border border-gray-800
          bg-gray-950
          p-8
          hover:border-green-500
          transition
        ">


          <h3 className="mb-5 text-xl font-bold">
            🚀 Strengths
          </h3>



          <div className="space-y-3">


            {analysis.strengths.map((item) => (

              <div
                key={item}
                className="
                  rounded-xl
                  bg-gray-900
                  p-3
                  text-gray-300
                "
              >

                ✓ {item}

              </div>

            ))}


          </div>


        </div>







        {/* Improvements */}

        <div className="
          rounded-3xl
          border border-gray-800
          bg-gray-950
          p-8
          hover:border-yellow-500
          transition
        ">


          <h3 className="mb-5 text-xl font-bold">
            ⚡ Improvements
          </h3>




          <div className="space-y-3">


            {analysis.improvements.map((item) => (

              <div
                key={item}
                className="
                  rounded-xl
                  bg-gray-900
                  p-3
                  text-gray-300
                "
              >

                • {item}

              </div>

            ))}



          </div>



        </div>




      </div>


    </div>

  );

}