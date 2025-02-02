export const StepItem = ({ number, header, detail, reverse }:any) => {
    return (
      <section className={`flex items-center justify-between col-span-full flex-col ${reverse ? 'md:flex-row-reverse ' : 'md:flex-row'} mb-8`}>
        {/* Number Circle */}
        <div className={`rounded-full w-36 h-36 bg-white border overflow-hidden mb-6 md:mb-0 border-gray-300 flex items-center justify-center text-[#BD5D55] text-9xl font-bold`}>
         <p className={`mt-10 ${reverse ?'text-[#2AABEE]' : 'text-[#BD5D55]'}`}>{number < 10 ? `0${number}` : number}</p> 
        </div>
  
        {/* Text Content */}
        <div className={`ml-4 text-left`}>
          <h3 className="text-3xl font-extrabold mb-3">{header}</h3>
          <p className="text-gray-600">{detail}</p>
        </div>
      </section>
    );
  };
  