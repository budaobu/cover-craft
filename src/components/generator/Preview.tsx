import { useGeneratorStore } from '@/store/generator';
import { computeBackgroundStyle } from '@/utils/generator';

export function Preview() {
  const {
    title,
    isCustomSize,
    customWidth,
    customHeight,
    selectedSize,
    borderRadius,
    backgroundType,
    backgroundColor,
    gradientStart,
    gradientEnd,
    gradientAngle,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    fontSize,
    fontFamily,
    fontWeight,
    textColor,
    letterSpacing
  } = useGeneratorStore();

  const backgroundStyle = computeBackgroundStyle(
    backgroundType,
    backgroundColor,
    gradientStart,
    gradientEnd,
    gradientAngle,
    backgroundImage,
    backgroundSize,
    backgroundPosition
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-auto bg-muted/40">
        <div className="flex h-full items-center justify-center p-6">
          <div
            id="cover-preview"
            className="border-0 flex items-center justify-center relative overflow-hidden"
            style={{
              width: isCustomSize ? customWidth : selectedSize.width,
              height: isCustomSize ? customHeight : selectedSize.height,
              borderRadius: `${borderRadius}px`,
              ...backgroundStyle
            }}
          >
            <div
              className="text-center p-8 transition-all"
              style={{
                fontSize: `${fontSize}px`,
                fontFamily,
                fontWeight,
                color: textColor,
                letterSpacing: `${letterSpacing}px`
              }}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}