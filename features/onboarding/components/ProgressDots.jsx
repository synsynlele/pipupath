export default function ProgressDots({
total = 6,
current = 1,
}) {

return (


<div className="mb-10 flex items-center gap-2">

  {Array.from({
    length: total,
  }).map((_, index) => (

    <div
      key={index}
      className={`
        h-2 rounded-full transition-all duration-300

        ${
          index < current
            ? "w-8 bg-blue-400"
            : "w-2 bg-white/10"
        }
      `}
    />

  ))}

</div>


);
}
