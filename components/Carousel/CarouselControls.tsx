import classNames from "classnames";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

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
          "<": !canScrollPrev,
          ">": canScrollPrev,
        })}
      >
        <SlArrowLeft size={30} />
      </button>
      <button
        onClick={() => {
          if (canScrollNext) {
            onNext();
          }
        }}
        disabled={!canScrollNext}
        className={classNames({
          "<": true,
          ">": !canScrollNext,
          "-": canScrollNext,
        })}
      >
        <SlArrowRight size={30} />
      </button>
    </div>
  );
};
export default CarouselControls;
