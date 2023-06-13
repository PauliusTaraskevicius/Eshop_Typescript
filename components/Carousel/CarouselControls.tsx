import classNames from "classnames";

interface CarouselControlsProps {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  canScrollPrev,
  canScrollNext,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex justify-center gap-2 ">
      <button
        onClick={() => {
          if (canScrollPrev) {
            onPrev();
          }
        }}
        disabled={!canScrollPrev}
        className={classNames({
          "px-4 py-2 text-white rounded-md": true,
          "bg-indigo-200": !canScrollPrev,
          "bg-indigo-400": canScrollPrev,
        })}
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (canScrollNext) {
            onNext();
          }
        }}
        disabled={!canScrollNext}
        className={classNames({
          "px-4 py-2 text-white rounded-md": true,
          "bg-indigo-200": !canScrollNext,
          "bg-indigo-400": canScrollNext,
        })}
      >
        Next
      </button>
    </div>
  );
};
export default CarouselControls;
